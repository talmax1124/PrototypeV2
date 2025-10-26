// Enhanced Notion Integration Service for UNF Career Hub V2
class NotionService {
    constructor() {
        // Backend API URL - dynamically set based on environment
        this.backendUrl = window.location.hostname === 'localhost' 
            ? 'http://localhost:3001/api' 
            : `${window.location.protocol}//${window.location.host}/api`;
        this.demoMode = false; // Use backend API
        
        // Initialize demo storage as fallback
        this.initializeDemoStorage();
    }

    initializeDemoStorage() {
        // Create demo storage in localStorage as fallback
        const dbTypes = ['applications', 'feedback', 'buttonClicks', 'pageViews', 'opportunityViews', 'mapInteractions'];
        dbTypes.forEach(dbType => {
            const key = `demo_notion_${dbType}`;
            if (!localStorage.getItem(key)) {
                localStorage.setItem(key, JSON.stringify([]));
            }
        });
    }

    async callBackendAPI(endpoint, data) {
        try {
            const response = await fetch(`${this.backendUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Data successfully sent to backend:', result);
            return result;
        } catch (error) {
            console.error('Error calling backend API:', error);
            // Fallback to demo storage
            return this.appendToDemoStorage('fallback', data);
        }
    }

    appendToDemoStorage(databaseKey, data) {
        try {
            const key = `demo_notion_${databaseKey}`;
            const existing = JSON.parse(localStorage.getItem(key) || '[]');
            existing.push({
                id: `demo_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
                created_time: new Date().toISOString(),
                properties: data
            });
            localStorage.setItem(key, JSON.stringify(existing));
            
            console.log(`[DEMO MODE] Data saved locally for Notion ${databaseKey}:`, data);
            console.log(`[DEMO MODE] Total records for ${databaseKey}:`, existing.length);
            
            return { success: true, demo: true, recordCount: existing.length };
        } catch (error) {
            console.error('Error saving to demo storage:', error);
            return { success: false, error: error.message };
        }
    }

    async logJobApplication(applicationData) {
        const data = {
            name: applicationData.name,
            email: applicationData.email,
            phone: applicationData.phone || '',
            jobTitle: applicationData.jobTitle,
            company: applicationData.company,
            jobId: applicationData.jobId,
            coverLetter: applicationData.coverLetter || '',
            distance: applicationData.distance || '',
            location: applicationData.location || ''
        };

        return await this.callBackendAPI('/job-application', data);
    }

    async logFeedback(feedbackData) {
        const data = {
            type: feedbackData.type,
            message: feedbackData.message,
            email: feedbackData.email || '',
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        };

        return await this.callBackendAPI('/feedback', data);
    }

    async logButtonClick(buttonData) {
        const data = {
            buttonType: buttonData.buttonType,
            buttonText: buttonData.buttonText,
            targetValue: buttonData.targetValue || '',
            section: buttonData.section || '',
            url: window.location.href,
            timestamp: new Date().toISOString()
        };

        return await this.callBackendAPI('/button-click', data);
    }

    async logPageView(pageData) {
        const data = {
            page: pageData.page,
            section: pageData.section || '',
            referrer: document.referrer || '',
            url: window.location.href,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };

        return await this.callBackendAPI('/page-view', data);
    }

    // New method for logging opportunity detail views
    async logOpportunityView(opportunityData) {
        const data = {
            opportunityId: opportunityData.id,
            opportunityTitle: opportunityData.title,
            company: opportunityData.company,
            location: opportunityData.location,
            distanceFromUNF: opportunityData.distanceFromUNF,
            type: opportunityData.type,
            major: opportunityData.major,
            viewType: opportunityData.viewType || 'card', // card, map, detail
            url: window.location.href,
            timestamp: new Date().toISOString()
        };

        return await this.callBackendAPI('/opportunity-view', data);
    }

    // New method for logging map interactions
    async logMapInteraction(interactionData) {
        const data = {
            interactionType: interactionData.type, // marker_click, zoom, pan, info_window
            opportunityId: interactionData.opportunityId || '',
            opportunityTitle: interactionData.opportunityTitle || '',
            company: interactionData.company || '',
            mapZoom: interactionData.zoom || '',
            mapCenter: interactionData.center || '',
            url: window.location.href,
            timestamp: new Date().toISOString()
        };

        return await this.callBackendAPI('/map-interaction', data);
    }

    // Method to export demo data (for testing purposes)
    exportDemoData() {
        const data = {};
        const dbTypes = ['applications', 'feedback', 'buttonClicks', 'pageViews', 'opportunityViews', 'mapInteractions'];
        dbTypes.forEach(dbType => {
            const key = `demo_notion_${dbType}`;
            data[dbType] = JSON.parse(localStorage.getItem(key) || '[]');
        });
        
        console.log('Demo data export:', data);
        return data;
    }

    // Method to clear demo data
    clearDemoData() {
        const dbTypes = ['applications', 'feedback', 'buttonClicks', 'pageViews', 'opportunityViews', 'mapInteractions'];
        dbTypes.forEach(dbType => {
            const key = `demo_notion_${dbType}`;
            localStorage.removeItem(key);
        });
        this.initializeDemoStorage();
        console.log('Demo data cleared and reinitialized');
    }

    // Get summary of collected data
    getDataSummary() {
        const summary = {};
        const dbTypes = ['applications', 'feedback', 'buttonClicks', 'pageViews', 'opportunityViews', 'mapInteractions'];
        dbTypes.forEach(dbType => {
            const key = `demo_notion_${dbType}`;
            const data = JSON.parse(localStorage.getItem(key) || '[]');
            summary[dbType] = {
                recordCount: data.length,
                lastUpdated: data.length > 0 ? data[data.length - 1].created_time : null
            };
        });
        
        console.log('Data summary:', summary);
        return summary;
    }

    // Get analytics insights
    getAnalyticsInsights() {
        const data = this.exportDemoData();
        
        const insights = {
            totalPageViews: data.pageViews.length,
            totalButtonClicks: data.buttonClicks.length,
            totalOpportunityViews: data.opportunityViews.length,
            totalMapInteractions: data.mapInteractions.length,
            totalApplications: data.applications.length,
            totalFeedback: data.feedback.length,
            mostViewedOpportunities: this.getMostViewedOpportunities(data.opportunityViews),
            popularSections: this.getPopularSections(data.buttonClicks),
            mapEngagement: this.getMapEngagement(data.mapInteractions),
            applicationConversionRate: this.getApplicationConversionRate(data.opportunityViews, data.applications)
        };
        
        console.log('Analytics insights:', insights);
        return insights;
    }

    getMostViewedOpportunities(opportunityViews) {
        const viewCounts = {};
        opportunityViews.forEach(view => {
            const key = `${view.properties.opportunityTitle} at ${view.properties.company}`;
            viewCounts[key] = (viewCounts[key] || 0) + 1;
        });
        
        return Object.entries(viewCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([opportunity, views]) => ({ opportunity, views }));
    }

    getPopularSections(buttonClicks) {
        const sectionCounts = {};
        buttonClicks.forEach(click => {
            const section = click.properties.section;
            sectionCounts[section] = (sectionCounts[section] || 0) + 1;
        });
        
        return Object.entries(sectionCounts)
            .sort(([,a], [,b]) => b - a)
            .map(([section, clicks]) => ({ section, clicks }));
    }

    getMapEngagement(mapInteractions) {
        const interactionTypes = {};
        mapInteractions.forEach(interaction => {
            const type = interaction.properties.interactionType;
            interactionTypes[type] = (interactionTypes[type] || 0) + 1;
        });
        
        return interactionTypes;
    }

    getApplicationConversionRate(opportunityViews, applications) {
        if (opportunityViews.length === 0) return 0;
        return ((applications.length / opportunityViews.length) * 100).toFixed(2) + '%';
    }
}

// Initialize the service
const notionService = new NotionService();

// Add console helper methods for debugging and analytics
window.exportDemoData = () => notionService.exportDemoData();
window.clearDemoData = () => notionService.clearDemoData();
window.getDataSummary = () => notionService.getDataSummary();
window.getAnalyticsInsights = () => notionService.getAnalyticsInsights();

// Log initialization
document.addEventListener('DOMContentLoaded', function() {
    if (notionService.demoMode) {
        console.log('Notion service initialized in DEMO MODE');
        console.log('Use exportDemoData() in console to see collected data');
        console.log('Use getDataSummary() to see data summary');
        console.log('Use getAnalyticsInsights() to see analytics insights');
        console.log('Use clearDemoData() to reset all data');
    } else {
        console.log('Notion service initialized with backend API');
    }
});