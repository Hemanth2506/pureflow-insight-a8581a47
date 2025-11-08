import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert AI assistant for the PureFlow microplastics detection and filtration system. Your knowledge includes:

CORE EXPERTISE:
1. Microplastics fundamentals - definition, sources, types (primary/secondary)
2. Health impacts - inflammation, chemical exposure, tissue damage, immune disruption
3. Environmental impacts - effects on wildlife, ecosystems, oceans, soil
4. Human exposure pathways - ingestion through water/food, inhalation of fibers
5. Water contamination levels - bottled water (~94 particles/L), tap water (~5 particles/L), filtered water (~2 particles/L)

THE PUREFLOW FILTRATION SYSTEM:
- 5-layer filtration system that removes 80-85% of microplastics
- Layer 1: Activated Carbon - removes 30% of microplastics and chemicals
- Layer 2: Coconut Fiber - removes 50% of microplastics, eco-friendly natural filtration
- Layer 3: Cotton-Aluminum Composite - removes 60% of microplastics, blocks fine particles
- Layer 4: Pumice Stone - removes 70% of microplastics, volcanic rock filtration
- Layer 5: Root Layer - removes 80-85% of microplastics, final biological filtration stage
- Product cost: 5000 INR

TECHNICAL DETAILS:
- Electrochemical Impedance Spectroscopy (EIS) for water quality analysis
- 3-electrode MMO setup (Ti/IrO2, 3.6cm²), Pt wire, Ag/AgCl reference
- 50ml beaker with water + Na2SO4
- FRA diagnostics, 0.1 MHz–1 Hz, 10 mV AC

RESPOND WITH:
- Clear, factual, scientific information
- Specific numbers and data when available
- Detailed layer-by-layer filtration explanations when asked
- Health and environmental impact information
- Technical specifications when relevant

DO NOT RESPOND TO:
- Questions unrelated to microplastics, water filtration, environmental science, or health
- General knowledge questions outside this domain
- Personal advice unrelated to water quality or microplastics

If asked about unrelated topics, politely redirect: "I'm specialized in microplastics, water filtration, and related health/environmental topics. Please ask me about these areas, and I'll be happy to help!"

Be concise, helpful, and educational. Use emojis occasionally for friendliness (🌊💧🔬⚠️🌱).`;

    console.log("Calling Lovable AI Gateway with messages:", messages.length);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), 
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service quota exceeded. Please contact support." }), 
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "AI service error. Please try again." }), 
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Successfully connected to AI Gateway, streaming response");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
