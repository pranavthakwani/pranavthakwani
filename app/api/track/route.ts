import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event_type, page, metadata, session_id, user_agent } = body;

    // Validate required fields
    if (!event_type || !page) {
      return NextResponse.json(
        { error: 'Missing required fields: event_type and page' },
        { status: 400 }
      );
    }

    // Insert analytics event into Supabase
    const { error } = await supabase.from('analytics_events').insert({
      event_type,
      page,
      metadata: metadata || {},
      session_id: session_id || null,
      user_agent: user_agent || request.headers.get('user-agent') || null,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Analytics tracking error:', error);
      return NextResponse.json(
        { error: 'Failed to track event' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Event tracked successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Fetch analytics summary
    const { data: events, error } = await supabase
      .from('analytics_events')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Analytics fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch analytics' },
        { status: 500 }
      );
    }

    // Process data for dashboard
    const totalVisits = events?.filter((e: any) => e.event_type === 'page_view').length || 0;
    
    const pageViews: Record<string, number> = {};
    const fileClicks: Record<string, number> = {};
    const topQuestionsMap: Record<string, number> = {};
    let chatInteractions = 0;

    events?.forEach((event: any) => {
      if (event.event_type === 'page_view') {
        pageViews[event.page] = (pageViews[event.page] || 0) + 1;
      }
      if (event.event_type === 'file_click' && event.metadata?.fileName) {
        fileClicks[event.metadata.fileName] = (fileClicks[event.metadata.fileName] || 0) + 1;
      }
      if (event.event_type === 'chat_interaction') {
        chatInteractions++;
        if (event.metadata?.question) {
          const q = event.metadata.question;
          topQuestionsMap[q] = (topQuestionsMap[q] || 0) + 1;
        }
      }
    });

    const topQuestions = Object.entries(topQuestionsMap)
      .map(([question, count]) => ({ question, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return NextResponse.json({
      totalVisits,
      pageViews,
      fileClicks,
      chatInteractions,
      topQuestions,
      recentEvents: events?.slice(0, 50),
    });
  } catch (error: any) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
