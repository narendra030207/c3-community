import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    const apiKey = process.env.GEMINI_API_KEY
    
    if (apiKey) {
      // Stub for actual AI interaction
      return NextResponse.json({ 
        success: true, 
        response: `[AI Powered] I understand you're asking about "${message}". As the C3 Community Assistant, I can help you with events, competitions, and general platform queries.` 
      })
    } else {
      // Fallback keyword matcher
      const msg = message.toLowerCase()
      let response = "I'm the C3 Community Assistant. I can help with platform navigation and FAQs."
      
      if (msg.includes("event") || msg.includes("workshop")) {
        response = "You can view and register for upcoming events in the 'Events' section of your dashboard."
      } else if (msg.includes("certificate")) {
        response = "Certificates are automatically issued after you successfully complete an event or competition. Check the 'Certificates' tab."
      } else if (msg.includes("password")) {
        response = "You can change your password in the 'Profile' section under your dashboard settings."
      }

      return NextResponse.json({ 
        success: true, 
        response: `[FAQ Mode] ${response}` 
      })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}
