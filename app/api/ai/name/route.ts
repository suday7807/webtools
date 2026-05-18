import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { keyword, industry, tool } = body

    if (!keyword) {
      return NextResponse.json(
        { error: 'Keyword is required' },
        { status: 400 }
      )
    }

    // For demo purposes, we'll use a fallback since we may not have OpenAI API key configured
    // In production, replace with actual OpenAI API call
    
    const names = generateFallbackNames(keyword, industry, tool)

    return NextResponse.json({ names })
  } catch (error) {
    console.error('AI name generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate names' },
      { status: 500 }
    )
  }
}

function generateFallbackNames(keyword: string, industry: string, tool: string): string[] {
  const prefixes = ['Swift', 'Smart', 'Pro', 'Ultra', 'Next', 'Flow', 'Cloud', 'Data', 'Tech', 'Nova']
  const suffixes = ['ly', 'io', 'app', 'hub', 'flow', 'sync', 'base', 'kit', 'forge', 'pilot']
  const saasSuffixes = ['SaaS', 'Hub', 'Desk', 'Stack', 'Suite', 'Platform', 'Works', 'Ops', 'Lab', 'Core']
  const chatbotNames = ['Bot', 'Assistant', 'Helper', 'Guide', 'Mate', 'Buddy', 'Partner', 'Agent', 'Pilot', 'Wizard']

  const names: string[] = []

  if (tool === 'saas') {
    // Generate SaaS brand names
    for (const prefix of prefixes.slice(0, 5)) {
      names.push(`${prefix}${keyword.split(' ')[0]}${saasSuffixes[Math.floor(Math.random() * saasSuffixes.length)]}`)
    }
    names.push(`${keyword.split(' ')[0]}${saasSuffixes[Math.floor(Math.random() * saasSuffixes.length)]}`)
    names.push(`${prefixes[Math.floor(Math.random() * prefixes.length)]}${keyword.split(' ')[0]}`)
    names.push(`${keyword.split(' ')[0]}Flow`)
    names.push(`Nova${keyword.split(' ')[0]}`)
    names.push(`${keyword.split(' ')[0]}Hub`)
    names.push(`Smart${keyword.split(' ')[0]}`)
    names.push(`${keyword.split(' ')[0]}Sync`)
  } else {
    // Generate chatbot names
    for (let i = 0; i < 5; i++) {
      const suffix = chatbotNames[Math.floor(Math.random() * chatbotNames.length)]
      names.push(`${keyword.split(' ')[0]}${suffix}`)
    }
    names.push(`AI${keyword.split(' ')[0]}`)
    names.push(`${keyword.split(' ')[0]}Bot`)
    names.push(`Smart${keyword.split(' ')[0]}Assistant`)
    names.push(`${keyword.split(' ')[0]}Helper`)
  }

  // Remove duplicates and limit to 10
  const uniqueNames = Array.from(new Set(names)).slice(0, 10)

  return uniqueNames.length > 0 ? uniqueNames : [
    `${keyword.split(' ')[0]}Assistant`,
    `Smart${keyword.split(' ')[0]}`,
    `${keyword.split(' ')[0]}Bot`,
    `AI${keyword.split(' ')[0]}`,
    `Next${keyword.split(' ')[0]}`,
  ]
}