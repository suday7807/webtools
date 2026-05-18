'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { Upload, X, FileImage, Download, Loader2, CheckCircle, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface FileWithPreview {
  file: File
  preview: string
}

export function ImageToPDFTool() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setFiles(prev => [...prev, ...newFiles])
    setIsComplete(false)
  }, [])

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev]
      URL.revokeObjectURL(newFiles[index].preview)
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp']
    },
    multiple: true
  })

  const convertToPDF = async () => {
    if (files.length === 0) return

    setIsConverting(true)
    try {
      const { PDFDocument } = await import('pdf-lib')
      const pdfDoc = await PDFDocument.create()

      for (const { file, preview } of files) {
        const imgBytes = await fetch(preview).then(r => r.arrayBuffer())
        let image

        if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(imgBytes)
        } else {
          image = await pdfDoc.embedJpg(imgBytes)
        }

        const page = pdfDoc.addPage([image.width, image.height])
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height
        })
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = 'converted.pdf'
      link.click()

      URL.revokeObjectURL(url)
      setIsComplete(true)
      toast.success('PDF created successfully!')
    } catch (error) {
      toast.error('Failed to create PDF. Please try again.')
      console.error(error)
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          'relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300',
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50 hover:bg-muted/50'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-lg font-medium mb-1">
              {isDragActive ? 'Drop images here' : 'Drag & drop images here'}
            </p>
            <p className="text-sm text-muted-foreground">
              or click to select files (PNG, JPG, GIF, WebP)
            </p>
          </div>
        </div>
      </div>

      {/* File Previews */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              {files.length} {files.length === 1 ? 'image' : 'images'} selected
            </h3>
            <button
              onClick={() => setFiles([])}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear all
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {files.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-square rounded-xl overflow-hidden bg-muted group"
              >
                <img
                  src={item.preview}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 p-1 rounded-lg bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Convert Button */}
      {files.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={convertToPDF}
            disabled={isConverting}
            className={cn(
              'inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all',
              isComplete
                ? 'bg-green-500 text-white'
                : 'bg-primary text-primary-foreground hover:bg-primary/90',
              isConverting && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isConverting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating PDF...
              </>
            ) : isComplete ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Download PDF
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Convert to PDF
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}