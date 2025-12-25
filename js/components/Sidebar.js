/**
 * SIDEBAR COMPONENT - LSPD BLUE THEME
 */

export default {
    name: 'Sidebar',
    template: `
        <nav class="w-20 h-full flex flex-col items-center py-6 border-r border-white/5 relative bg-[#0f111a] shadow-[inset_-10px_0_20px_rgba(0,0,0,0.5)]">
            
            <!-- Metallic Texture Overlay -->
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMGYxMTFhIiAvPgo8cGF0aCBkPSJNMSAzaDF2MUgxVjN6bTIgMWgxdjFIM1Y0eiIgZmlsbD0iIzIyMjIyMiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-20 pointer-events-none"></div>

            <!-- Navigation Links -->
            <div class="relative z-10 flex flex-col items-center space-y-4 flex-1 mt-6">
                <a v-for="item in navItems"
                   :key="item.id"
                   :href="item.href"
                   @click.prevent="setActive(item.id)"
                   :class="[
                       'relative w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group',
                       activeNav === item.id
                           ? 'bg-gradient-to-br from-md-primary to-blue-700 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] ring-1 ring-white/20'
                           : 'text-gray-500 hover:text-white hover:bg-white/5'
                   ]"
                   :title="item.label">
                    
                    <component :is="item.icon" class="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    
                    <!-- Realistic Active Indicator (Led Light) -->
                    <div v-if="activeNav === item.id"
                         class="absolute -left-4 w-1 h-8 bg-blue-500 rounded-r-sm shadow-[0_0_10px_#3b82f6]"></div>
                </a>
            </div>

            <!-- Bottom Section - Panic Button (Industrial Switch) -->
            <div class="relative z-10 flex flex-col items-center space-y-3 mt-auto mb-4">
                <div class="w-12 h-12 rounded-lg bg-[#1a1a20] border border-white/5 flex items-center justify-center p-1 shadow-inner">
                    <a href="#panic"
                       @click.prevent="triggerPanic"
                       class="w-full h-full rounded flex items-center justify-center bg-gradient-to-b from-red-500 to-red-700 text-white shadow-[0_2px_5px_rgba(0,0,0,0.5)] active:translate-y-[1px] active:shadow-none transition-all border-t border-red-400">
                        <svg class="relative z-10 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </nav>
    `,
    props: ['currentView'],
    emits: ['navigate'],
    setup(props, { emit }) {
        const { computed, h } = Vue;

        const activeNav = computed(() => props.currentView);

        const setActive = (id) => {
            emit('navigate', id);
        };

        // Modern Icon Components
        const DashboardIcon = () => h('svg', {
            class: 'w-6 h-6',
            fill: 'none',
            stroke: 'currentColor',
            viewBox: '0 0 24 24'
        }, [
            h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
            })
        ]);

        const SearchIcon = () => h('svg', {
            class: 'w-6 h-6',
            fill: 'none',
            stroke: 'currentColor',
            viewBox: '0 0 24 24'
        }, [
            h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            })
        ]);

        const ReportsIcon = () => h('svg', {
            class: 'w-6 h-6',
            fill: 'none',
            stroke: 'currentColor',
            viewBox: '0 0 24 24'
        }, [
            h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
            })
        ]);

        const VehiclesIcon = () => h('svg', {
            class: 'w-6 h-6',
            fill: 'none',
            stroke: 'currentColor',
            viewBox: '0 0 24 24'
        }, [
            h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M8 7h8m-8 4h8m-4 4h.01M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z'
            })
        ]);

        const OfficersIcon = () => h('svg', {
            class: 'w-6 h-6',
            fill: 'none',
            stroke: 'currentColor',
            viewBox: '0 0 24 24'
        }, [
            h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
            })
        ]);

        const SettingsIcon = () => h('svg', {
            class: 'w-6 h-6',
            fill: 'none',
            stroke: 'currentColor',
            viewBox: '0 0 24 24'
        }, [
            h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
            }),
            h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
            })
        ]);

        const navItems = [
            { id: 'dashboard', label: 'Kontrol Paneli', href: '#dashboard', icon: DashboardIcon },
            { id: 'search', label: 'Arama', href: '#search', icon: SearchIcon },
            { id: 'reports', label: 'Raporlar', href: '#reports', icon: ReportsIcon },
            { id: 'vehicles', label: 'Araçlar', href: '#vehicles', icon: VehiclesIcon },
            { id: 'officers', label: 'Memurlar', href: '#officers', icon: OfficersIcon },
            { id: 'settings', label: 'Ayarlar', href: '#settings', icon: SettingsIcon },
        ];

        const triggerPanic = () => {
            alert('PANİK BUTONU AKTİF! TÜM BİRİMLER UYARILDI!');
        };

        return {
            activeNav,
            navItems,
            setActive,
            triggerPanic
        };
    }
};