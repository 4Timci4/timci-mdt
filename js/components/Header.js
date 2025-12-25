/**
 * HEADER COMPONENT - LSPD BLUE THEME
 */

export default {
    name: 'Header',
    template: `
        <header class="glass-panel h-16 flex items-center justify-between px-6 border-b border-md-border relative bg-[#13131a]">
            <!-- Top Accent Line -->
            <div class="absolute top-0 left-0 right-0 h-[2px] bg-md-primary opacity-60"></div>
            
            <!-- Left Section - Brand -->
            <div class="flex items-center space-x-5">
                <div class="relative">
                    <div class="relative w-11 h-11 rounded-xl bg-md-primary flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                    </div>
                </div>
                <div>
                    <div class="flex items-center space-x-2">
                        <h1 class="text-xl font-bold text-white">LSPD MDT</h1>
                        <span class="px-2 py-0.5 text-xs font-semibold bg-md-primary text-white rounded">
                            v2.0
                        </span>
                    </div>
                    <p class="text-xs text-md-text-dim font-mono mt-0.5">Los Santos Police Department</p>
                </div>
            </div>

            <!-- Center Section - Status & Stats -->
            <div class="flex items-center space-x-6">
                <!-- System Status -->
                <div class="flex items-center space-x-3 px-4 py-2 rounded-xl bg-md-surface2 border border-md-border">
                    <div class="flex items-center space-x-2">
                        <div class="w-2 h-2 rounded-full bg-green-500"></div>
                        <span class="text-sm font-semibold text-md-text-muted">SİSTEM AKTİF</span>
                    </div>
                    <div class="w-px h-4 bg-md-border"></div>
                    <span class="text-xs font-mono text-md-text-dim">SC-2024-1225-0842</span>
                </div>

                <!-- Quick Stats -->
                <div class="flex items-center space-x-4">
                    <div class="text-center">
                        <p class="text-lg font-bold text-md-success">{{ activeUnits }}</p>
                        <p class="text-xs text-md-text-dim">BİRİM</p>
                    </div>
                    <div class="w-px h-8 bg-md-border"></div>
                    <div class="text-center">
                        <p class="text-lg font-bold text-md-warning">{{ activeCalls }}</p>
                        <p class="text-xs text-md-text-dim">ÇAĞRI</p>
                    </div>
                </div>
            </div>

            <!-- Right Section - User & Time -->
            <div class="flex items-center space-x-5">
                <!-- Emergency Button -->
                <button @click="triggerEmergency"
                        class="relative group px-4 py-2 rounded-xl bg-md-danger text-white font-semibold text-sm transition-all duration-200 hover:opacity-90">
                    <span class="flex items-center space-x-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                        <span>ACİL</span>
                    </span>
                </button>

                <div class="w-px h-8 bg-md-border"></div>

                <!-- User Profile -->
                <div class="flex items-center space-x-3">
                    <div class="text-right">
                        <p class="text-sm font-bold text-md-text-main">{{ officer.rank }} {{ officer.name }}</p>
                        <p class="text-xs text-md-text-dim font-mono">{{ officer.badge }}</p>
                    </div>
                    <div class="relative">
                        <div class="relative w-11 h-11 rounded-xl bg-md-accent flex items-center justify-center">
                            <span class="text-sm font-bold text-white">{{ officer.initials }}</span>
                        </div>
                        <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-md-success rounded-full border-2 border-md-bg"></div>
                    </div>
                </div>

                <!-- Time Display -->
                <div class="w-28 text-right bg-md-surface2 rounded-xl px-4 py-2 border border-md-border">
                    <p class="text-lg font-bold text-md-text-main font-mono">{{ currentTime }}</p>
                    <p class="text-xs text-md-text-dim">{{ currentDate }}</p>
                </div>
            </div>
        </header>
    `,
    setup() {
        const { ref, onMounted, onUnmounted } = Vue;

        const currentTime = ref('');
        const currentDate = ref('');
        const activeUnits = ref(12);
        const totalUnits = ref(18);
        const activeCalls = ref(7);

        const officer = {
            name: 'J. SMITH',
            rank: 'Det. Sgt.',
            badge: '#2847',
            initials: 'JS'
        };

        let timeInterval;

        const updateClock = () => {
            const now = new Date();
            currentTime.value = now.toLocaleTimeString('tr-TR', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
            });
            currentDate.value = now.toLocaleDateString('tr-TR', { 
                day: '2-digit', 
                month: '2-digit',
                year: 'numeric'
            });
        };

        const triggerEmergency = () => {
            alert('ACİL DURUM BUTONU AKTİF!');
        };

        onMounted(() => {
            updateClock();
            timeInterval = setInterval(updateClock, 1000);
        });

        onUnmounted(() => {
            if (timeInterval) clearInterval(timeInterval);
        });

        return {
            currentTime,
            currentDate,
            activeUnits,
            totalUnits,
            activeCalls,
            officer,
            triggerEmergency
        };
    }
};