/**
 * MDT APPLICATION ENTRY POINT - LSPD BLUE THEME
 * Los Santos Police Department Mobile Data Terminal
 */

import Header from './components/Header.js';
import Sidebar from './components/Sidebar.js';
import Dashboard from './views/Dashboard.js';
import Search from './views/Search.js';

const { createApp, ref, computed } = Vue;

const app = createApp({
    name: 'MDTApp',
    components: {
        Header,
        Sidebar,
        Dashboard,
        Search
    },
    template: `
        <div class="h-screen flex flex-col">
            <!-- Header -->
            <Header />
            
            <!-- Main Content Area -->
            <div class="flex-1 flex overflow-hidden">
                <!-- Sidebar Navigation -->
                <Sidebar @navigate="setCurrentView" :current-view="currentView" />
                
                <!-- Main Content -->
                <main class="flex-1 overflow-auto bg-[#0f111a]">
                    <KeepAlive>
                        <component :is="currentViewComponent" />
                    </KeepAlive>
                </main>
            </div>
        </div>
    `,
    setup() {
        console.log('%c🚀 MDT Sistemi Başlatılıyor...', 'color: #2563eb; font-size: 14px; font-weight: bold;');
        
        // Restore current view from localStorage or default to 'dashboard'
        const currentView = ref(localStorage.getItem('mdt_current_view') || 'dashboard');

        const currentViewComponent = computed(() => {
            switch (currentView.value) {
                case 'dashboard': return 'Dashboard';
                case 'search': return 'Search';
                default: return 'Dashboard';
            }
        });

        const setCurrentView = (viewId) => {
            currentView.value = viewId;
            localStorage.setItem('mdt_current_view', viewId);
        };
        
        return {
            currentView,
            currentViewComponent,
            setCurrentView
        };
    }
});

// Uygulamayı monte et
app.mount('#app');