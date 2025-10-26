const express = require('express');
const cors = require('cors');
const { Client } = require('@notionhq/client');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize Notion client
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('.'));

// Database IDs from environment variables
const databases = {
    applications: process.env.NOTION_APPLICATIONS_DB,
    feedback: process.env.NOTION_FEEDBACK_DB,
    buttonClicks: process.env.NOTION_BUTTON_CLICKS_DB,
    pageViews: process.env.NOTION_PAGE_VIEWS_DB,
    opportunityViews: process.env.NOTION_OPPORTUNITY_VIEWS_DB,
    mapInteractions: process.env.NOTION_MAP_INTERACTIONS_DB
};

// Helper function to add data to Notion
async function addToNotionDatabase(databaseId, properties) {
    try {
        console.log('Attempting to save to Notion database:', databaseId);
        console.log('Properties:', JSON.stringify(properties, null, 2));
        
        if (!databaseId) {
            throw new Error('Database ID is missing');
        }
        
        if (!process.env.NOTION_TOKEN) {
            throw new Error('NOTION_TOKEN environment variable is missing');
        }
        
        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: properties
        });
        
        console.log('Successfully saved to Notion:', response.id);
        return { success: true, data: response };
    } catch (error) {
        console.error('Notion API Error Details:', {
            message: error.message,
            code: error.code,
            status: error.status,
            databaseId: databaseId,
            hasToken: !!process.env.NOTION_TOKEN
        });
        return { success: false, error: error.message };
    }
}

// API Routes

// Job Applications
app.post('/api/job-application', async (req, res) => {
    const { name, email, phone, jobTitle, company, jobId, coverLetter, distance, location } = req.body;
    
    const properties = {
        'Name': {
            title: [{ text: { content: name } }]
        },
        'Email': {
            email: email
        },
        'Phone': {
            phone_number: phone || ''
        },
        'Job Title': {
            rich_text: [{ text: { content: jobTitle } }]
        },
        'Company': {
            rich_text: [{ text: { content: company } }]
        },
        'Job ID': {
            rich_text: [{ text: { content: jobId.toString() } }]
        },
        'Cover Letter': {
            rich_text: [{ text: { content: coverLetter || '' } }]
        },
        'Distance from UNF': {
            rich_text: [{ text: { content: distance || '' } }]
        },
        'Location': {
            rich_text: [{ text: { content: location || '' } }]
        },
        'Applied Date': {
            date: { start: new Date().toISOString().split('T')[0] }
        }
    };

    const result = await addToNotionDatabase(databases.applications, properties);
    
    if (result.success) {
        res.json({ success: true, message: 'Application submitted successfully' });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});

// Feedback
app.post('/api/feedback', async (req, res) => {
    const { type, message, email, url, userAgent, timestamp } = req.body;
    
    const properties = {
        'Type': {
            select: { name: type }
        },
        'Message': {
            rich_text: [{ text: { content: message } }]
        },
        'Email': {
            email: email || null
        },
        'URL': {
            url: url
        },
        'User Agent': {
            rich_text: [{ text: { content: userAgent || '' } }]
        },
        'Date': {
            date: { start: new Date().toISOString().split('T')[0] }
        },
        'Timestamp': {
            rich_text: [{ text: { content: timestamp || new Date().toISOString() } }]
        }
    };

    const result = await addToNotionDatabase(databases.feedback, properties);
    
    if (result.success) {
        res.json({ success: true, message: 'Feedback submitted successfully' });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});

// Button Clicks
app.post('/api/button-click', async (req, res) => {
    const { buttonType, buttonText, targetValue, section, url, timestamp } = req.body;
    
    const properties = {
        'Button Type': {
            rich_text: [{ text: { content: buttonType } }]
        },
        'Button Text': {
            rich_text: [{ text: { content: buttonText } }]
        },
        'Target Value': {
            rich_text: [{ text: { content: targetValue || '' } }]
        },
        'Section': {
            rich_text: [{ text: { content: section || '' } }]
        },
        'URL': {
            url: url
        },
        'Date': {
            date: { start: new Date().toISOString().split('T')[0] }
        },
        'Timestamp': {
            rich_text: [{ text: { content: timestamp || new Date().toISOString() } }]
        }
    };

    const result = await addToNotionDatabase(databases.buttonClicks, properties);
    
    if (result.success) {
        res.json({ success: true, message: 'Button click logged successfully' });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});

// Page Views
app.post('/api/page-view', async (req, res) => {
    const { page, section, referrer, url, timestamp, userAgent } = req.body;
    
    const properties = {
        'Page': {
            rich_text: [{ text: { content: page } }]
        },
        'Section': {
            rich_text: [{ text: { content: section || '' } }]
        },
        'Referrer': {
            url: referrer || null
        },
        'URL': {
            url: url
        },
        'User Agent': {
            rich_text: [{ text: { content: userAgent || '' } }]
        },
        'Date': {
            date: { start: new Date().toISOString().split('T')[0] }
        },
        'Timestamp': {
            rich_text: [{ text: { content: timestamp || new Date().toISOString() } }]
        }
    };

    const result = await addToNotionDatabase(databases.pageViews, properties);
    
    if (result.success) {
        res.json({ success: true, message: 'Page view logged successfully' });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});

// Opportunity Views
app.post('/api/opportunity-view', async (req, res) => {
    const { 
        opportunityId, 
        opportunityTitle, 
        company, 
        location, 
        distanceFromUNF, 
        type, 
        major, 
        viewType, 
        url, 
        timestamp 
    } = req.body;
    
    const properties = {
        'Opportunity ID': {
            rich_text: [{ text: { content: opportunityId.toString() } }]
        },
        'Opportunity Title': {
            rich_text: [{ text: { content: opportunityTitle } }]
        },
        'Company': {
            rich_text: [{ text: { content: company } }]
        },
        'Location': {
            rich_text: [{ text: { content: location } }]
        },
        'Distance from UNF': {
            rich_text: [{ text: { content: distanceFromUNF.toString() } }]
        },
        'Type': {
            rich_text: [{ text: { content: type } }]
        },
        'Major': {
            rich_text: [{ text: { content: major } }]
        },
        'View Type': {
            rich_text: [{ text: { content: viewType } }]
        },
        'URL': {
            url: url
        },
        'Date': {
            date: { start: new Date().toISOString().split('T')[0] }
        },
        'Timestamp': {
            rich_text: [{ text: { content: timestamp || new Date().toISOString() } }]
        }
    };

    const result = await addToNotionDatabase(databases.opportunityViews, properties);
    
    if (result.success) {
        res.json({ success: true, message: 'Opportunity view logged successfully' });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});

// Map Interactions
app.post('/api/map-interaction', async (req, res) => {
    const { 
        interactionType, 
        opportunityId, 
        opportunityTitle, 
        company, 
        mapZoom, 
        mapCenter, 
        url, 
        timestamp 
    } = req.body;
    
    const properties = {
        'Interaction Type': {
            rich_text: [{ text: { content: interactionType } }]
        },
        'Opportunity ID': {
            rich_text: [{ text: { content: opportunityId || '' } }]
        },
        'Opportunity Title': {
            rich_text: [{ text: { content: opportunityTitle || '' } }]
        },
        'Company': {
            rich_text: [{ text: { content: company || '' } }]
        },
        'Map Zoom': {
            rich_text: [{ text: { content: mapZoom || '' } }]
        },
        'Map Center': {
            rich_text: [{ text: { content: mapCenter || '' } }]
        },
        'URL': {
            url: url
        },
        'Date': {
            date: { start: new Date().toISOString().split('T')[0] }
        },
        'Timestamp': {
            rich_text: [{ text: { content: timestamp || new Date().toISOString() } }]
        }
    };

    const result = await addToNotionDatabase(databases.mapInteractions, properties);
    
    if (result.success) {
        res.json({ success: true, message: 'Map interaction logged successfully' });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'UNF Career Hub V2 API is running',
        version: '2.0.0',
        features: ['location-awareness', 'google-maps', 'detailed-opportunities', 'enhanced-analytics'],
        notion: {
            hasToken: !!process.env.NOTION_TOKEN,
            databases: {
                applications: !!databases.applications,
                feedback: !!databases.feedback,
                buttonClicks: !!databases.buttonClicks,
                pageViews: !!databases.pageViews,
                opportunityViews: !!databases.opportunityViews,
                mapInteractions: !!databases.mapInteractions
            }
        }
    });
});

// Test Notion connectivity
app.get('/api/test-notion', async (req, res) => {
    try {
        const testProperties = {
            'Test Field': {
                title: [{ text: { content: 'Test Entry ' + new Date().toISOString() } }]
            }
        };
        
        // Test with feedback database (simplest structure)
        const result = await addToNotionDatabase(databases.feedback, {
            'Type': {
                select: { name: 'general' }
            },
            'Message': {
                rich_text: [{ text: { content: 'API connectivity test - ' + new Date().toISOString() } }]
            },
            'Date': {
                date: { start: new Date().toISOString().split('T')[0] }
            }
        });
        
        res.json({
            success: result.success,
            message: result.success ? 'Notion connectivity test passed' : 'Notion connectivity test failed',
            error: result.error || null,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Notion connectivity test failed',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Analytics endpoint (optional - for dashboard)
app.get('/api/analytics', async (req, res) => {
    try {
        // This would typically query Notion databases for analytics
        // For now, return a simple response
        res.json({
            message: 'Analytics data would be aggregated from Notion databases',
            availableMetrics: [
                'total_page_views',
                'total_opportunity_views', 
                'total_applications',
                'most_popular_opportunities',
                'user_engagement_by_section',
                'map_interaction_patterns',
                'conversion_rates'
            ]
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Catch-all handler: send back index.html for any non-API routes
app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
        res.sendFile(__dirname + '/index.html');
    }
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`UNF Career Hub V2 API server running on port ${port}`);
    console.log(`Health check available at /api/health`);
    console.log(`Analytics endpoint available at /api/analytics`);
    console.log('Enhanced features: Location awareness, Google Maps, Detailed opportunities');
});