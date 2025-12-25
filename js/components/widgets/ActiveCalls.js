/**
 * ACTIVE CALLS WIDGET - WITHOUT MODAL
 * Modal Dashboard seviyesinde render ediliyor
 */

export default {
    name: 'ActiveCalls',
    emits: ['open-call-detail'],
    template: `
        <div class="bg-[#13131a] border border-white/5 rounded-xl overflow-hidden h-fit flex flex-col min-h-[480px]">
            <!-- Widget Header -->
            <div class="px-5 py-3 border-b border-white/5 flex items-center justify-between relative">
                <div class="flex items-center space-x-3">
                    <div class="relative">
                        <div class="w-8 h-8 rounded-lg bg-md-warning/10 flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-base font-bold text-white tracking-widest uppercase leading-none">Aktif Çağrılar</h3>
                        <p class="text-xs text-white/30 font-mono mt-1 uppercase">Sistem İzleme Aktif</p>
                    </div>
                </div>
                <div class="flex items-center space-x-3">
                    <span class="badge badge-warning text-[10px]">{{ filteredCalls.length }} AKTİF</span>
                    <button @click="refreshCalls"
                            class="p-2 rounded-xl hover:bg-md-surface2 transition-all duration-200 group">
                        <svg class="w-5 h-5 text-md-text-dim group-hover:text-md-primary group-hover:rotate-180 transition-all duration-500" 
                             :class="{ 'animate-spin': isRefreshing }"
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Calls Table -->
            <div class="flex-1 overflow-hidden flex flex-col min-h-[360px]">
                <table class="data-table w-full flex-1">
                    <thead class="bg-md-surface z-10 shadow-lg">
                        <tr>
                            <th class="w-[1%] whitespace-nowrap text-md-text-main">ID</th>
                            <th class="w-[40%] text-md-text-main">KONUM & ADRES</th>
                            <th class="w-[1%] whitespace-nowrap text-md-text-main border-l border-white/5">İHBARCI</th>
                            <th class="w-[1%] whitespace-nowrap text-md-text-main text-right">DURUM</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="call in paginatedCalls"
                            :key="call.id"
                            @click="$emit('open-call-detail', call)"
                            :class="[
                                'cursor-pointer group transition-all duration-200 border-b border-white/5',
                                call.priority === 'CRITICAL'
                                    ? 'bg-md-danger/5 hover:bg-md-danger/10'
                                    : 'hover:bg-white/[0.02]'
                            ]">
                            <!-- Call ID -->
                            <td class="py-2.5 px-3 w-[1%] whitespace-nowrap border-r border-white/5">
                                <div class="text-[13px] font-mono font-bold text-md-primary">
                                    {{ call.callId }}
                                </div>
                            </td>
                            
                            <!-- Location -->
                            <td class="py-2.5 px-3 w-[10%] max-w-[10px]">
                                <div class="flex flex-col">
                                    <span class="text-[13px] font-bold text-white/90 uppercase tracking-tight truncate">{{ call.district }}</span>
                                    <span class="text-[11px] text-white/30 font-mono mt-0.5 truncate">{{ call.address }}</span>
                                </div>
                            </td>
                            
                            <!-- Caller -->
                            <td class="py-2.5 px-3 w-[1%] whitespace-nowrap border-l border-white/5">
                                <div class="flex flex-col">
                                    <span class="text-xs text-white/70 leading-none">{{ call.caller }}</span>
                                    <span class="text-[10px] text-white/30 font-mono mt-1">{{ call.callerPhone }}</span>
                                </div>
                            </td>
                            
                            <!-- Status -->
                            <td class="py-2.5 px-3 w-[1%] whitespace-nowrap text-right border-l border-white/5">
                                <span :class="[
                                    'inline-block px-2 py-1 rounded text-[10px] font-bold tracking-tighter border uppercase',
                                    getStatusCompactClass(call.status)
                                ]">
                                    {{ getStatusLabel(call.status) }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination & Footer -->
            <div class="px-5 py-2.5 border-t border-white/5 flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <span class="text-xs text-white/30 font-mono flex items-center space-x-2">
                        <span class="w-1.5 h-1.5 bg-md-success rounded-full"></span>
                        <span>SİSTEM AKTİF: {{ lastUpdate }}</span>
                    </span>
                </div>

                <div class="flex items-center space-x-2">
                    <button @click="prevPage"
                            :disabled="currentPage === 1"
                            class="p-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all text-white/60">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    
                    <div class="flex items-center space-x-1 px-3">
                        <span class="text-xs font-mono font-bold text-md-primary">{{ currentPage }}</span>
                        <span class="text-xs font-mono text-white/20">/</span>
                        <span class="text-xs font-mono text-white/40">{{ totalPages }}</span>
                    </div>

                    <button @click="nextPage"
                            :disabled="currentPage === totalPages"
                            class="p-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all text-white/60">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </button>
                </div>
            </div>
        </div>
    `,
    setup() {
        const { ref, computed, onMounted, onUnmounted } = Vue;

        const allCalls = ref([
            { id: 1, callId: '#2471', district: 'Vespucci Beach', address: '1704 Marina Dr, Apt 4B', caller: 'Anonim İhbar', callerPhone: 'Gizli Numara', priority: 'CRITICAL', status: 'PENDING', type: 'Silahlı Soygun', message: 'Silahlı soygun yapılıyor! Kırmızı tişörtlü beyaz erkek şahıs, tabanca var.', timeAgo: '3 dk önce', assignedOfficer: null, assignedAt: null, assignedBadgeNumber: null },
            { id: 2, callId: '#2470', district: 'Rockford Hills', address: '4200 Capital Blvd', caller: 'Mehmet Yılmaz', callerPhone: '+1 555-0123', priority: 'HIGH', status: 'ASSIGNED', type: 'Trafik Kazası', message: 'Trafik kazası oldu, bir kişi yaralandı. Sürücü olay yerinden kaçtı.', timeAgo: '7 dk önce', assignedOfficer: 'Memur A. Rodriguez', assignedAt: new Date(Date.now() - 7 * 60000).toISOString(), assignedBadgeNumber: 'LSPD-2847' },
            { id: 3, callId: '#2469', district: 'Davis', address: '1200 Grove St', caller: 'Vatandaş', callerPhone: '+1 555-0456', priority: 'MEDIUM', status: 'PENDING', type: 'Hırsızlık', message: 'Şüpheli kişiler arka bahçeye giriyor. Siyah mont giymişler.', timeAgo: '12 dk önce', assignedOfficer: null, assignedAt: null, assignedBadgeNumber: null },
            { id: 4, callId: '#2468', district: 'Burton', address: 'LSPD Merkez', caller: 'Memur J. Smith', callerPhone: 'Birim Radio', priority: 'MEDIUM', status: 'ASSIGNED', type: 'Takviye Talebi', message: 'Şüpheli şahıs karşılık veriyor, takviye birim lazım.', timeAgo: '15 dk önce', assignedOfficer: 'Memur D. Johnson', assignedAt: new Date(Date.now() - 10 * 60000).toISOString(), assignedBadgeNumber: 'LSPD-1923' },
            { id: 5, callId: '#2467', district: 'Richards Majestic', address: '802 Power St', caller: 'Güvenlik', callerPhone: '+1 555-0789', priority: 'LOW', status: 'PENDING', type: 'Sesli İhtilaf', message: 'Site içinde sürekli yüksek ses, komşular şikayetçi.', timeAgo: '22 dk önce', assignedOfficer: null, assignedAt: null, assignedBadgeNumber: null },
            { id: 6, callId: '#2466', district: 'Strawberry', address: 'Innocence Blvd', caller: 'Market Sahibi', callerPhone: '+1 555-0999', priority: 'HIGH', status: 'PENDING', type: 'Market Soygunu', message: 'Kasiyere silah çekildi, şüpheli kaçmaya çalışıyor.', timeAgo: '25 dk önce', assignedOfficer: null, assignedAt: null, assignedBadgeNumber: null },
            { id: 7, callId: '#2465', district: 'Vinewood', address: 'Clinton Ave', caller: 'Anonim', callerPhone: 'Gizli Numara', priority: 'LOW', status: 'ASSIGNED', type: 'Yanlış Park', message: 'Garaj girişimi kapatmışlar, aracın çekilmesi lazım.', timeAgo: '30 dk önce', assignedOfficer: 'Memur S. Baker', assignedAt: new Date(Date.now() - 5 * 60000).toISOString(), assignedBadgeNumber: 'LSPD-1102' },
            { id: 8, callId: '#2464', district: 'Paleto Bay', address: 'Great Ocean Hwy', caller: 'Korucu', callerPhone: '+1 555-8888', priority: 'MEDIUM', status: 'PENDING', type: 'Kaçak Avcılık', message: 'Ormanlık alanda tüfek sesleri geliyor.', timeAgo: '35 dk önce', assignedOfficer: null, assignedAt: null, assignedBadgeNumber: null },
            { id: 9, callId: '#2463', district: 'Legion Square', address: 'Power St', caller: 'Devriye', callerPhone: 'Birim Radio', priority: 'CRITICAL', status: 'PENDING', type: 'Memur Vuruldu', message: '10-13! Memur ateş altında acil destek!', timeAgo: '1 dk önce', assignedOfficer: null, assignedAt: null, assignedBadgeNumber: null },
            { id: 10, callId: '#2462', district: 'La Mesa', address: 'Supply St', caller: 'İşçi', callerPhone: '+1 555-7777', priority: 'MEDIUM', status: 'ASSIGNED', type: 'Kavga', message: 'Depo önünde iki grup arasında arbede yaşanıyor.', timeAgo: '40 dk önce', assignedOfficer: 'Memur M. Ross', assignedAt: new Date(Date.now() - 15 * 60000).toISOString(), assignedBadgeNumber: 'LSPD-3344' },
            { id: 11, callId: '#2461', district: 'Sandy Shores', address: 'Alhambra Dr', caller: 'Yerel Sakin', callerPhone: '+1 555-6666', priority: 'LOW', status: 'PENDING', type: 'Mülke Tecavüz', message: 'Boş eve birileri girdiğini gördüm.', timeAgo: '45 dk önce', assignedOfficer: null, assignedAt: null, assignedBadgeNumber: null },
            { id: 12, callId: '#2460', district: 'Pacific Bluffs', address: 'Great Ocean Hwy', caller: 'Güvenlik', callerPhone: '+1 555-5555', priority: 'HIGH', status: 'PENDING', type: 'Ev Soygunu', message: 'Alarm tetiklendi, kameralarda şüpheli araç var.', timeAgo: '50 dk önce', assignedOfficer: null, assignedAt: null, assignedBadgeNumber: null },
            { id: 13, callId: '#2459', district: 'Downtown', address: 'San Andreas Ave', caller: 'Banka Müdürü', callerPhone: '+1 555-4444', priority: 'CRITICAL', status: 'ASSIGNED', type: 'Banka Soygunu', message: 'Sessiz alarm tetiklendi, içeride rehineler olabilir.', timeAgo: '55 dk önce', assignedOfficer: 'Memur T. Miller', assignedAt: new Date(Date.now() - 2 * 60000).toISOString(), assignedBadgeNumber: 'LSPD-5566' },
            { id: 14, callId: '#2458', district: 'Chumash', address: 'Barbureno Rd', caller: 'Balıkçı', callerPhone: '+1 555-3333', priority: 'LOW', status: 'PENDING', type: 'Yasadışı Balıkçılık', message: 'Yasak bölgede ağ atan bir tekne var.', timeAgo: '1 saat önce', assignedOfficer: null, assignedAt: null, assignedBadgeNumber: null },
            { id: 15, callId: '#2457', district: 'Little Seoul', address: 'Ginger St', caller: 'Sakin', callerPhone: '+1 555-2222', priority: 'MEDIUM', status: 'PENDING', type: 'Uyuşturucu Satışı', message: 'Köşede şüpheli paket alışverişi yapılıyor.', timeAgo: '1 saat önce', assignedOfficer: null, assignedAt: null, assignedBadgeNumber: null }
        ]);

        const currentPage = ref(1);
        const itemsPerPage = 6;

        // PENDING, ASSIGNED ve COMPLETED durumlarını göster
        const filteredCalls = computed(() => {
            return allCalls.value.filter(call =>
                call.status === 'PENDING' || call.status === 'ASSIGNED' || call.status === 'COMPLETED'
            );
        });

        const totalPages = computed(() => Math.max(1, Math.ceil(filteredCalls.value.length / itemsPerPage)));

        const paginatedCalls = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return filteredCalls.value.slice(start, end);
        });

        const lastUpdate = ref('');
        const isRefreshing = ref(false);

        let updateInterval;

        const updateTime = () => {
            const now = new Date();
            lastUpdate.value = now.toLocaleTimeString('tr-TR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        };

        const getStatusCompactClass = (status) => {
            const classes = {
                'PENDING': 'bg-md-warning/10 text-md-warning border-md-warning/20',
                'ASSIGNED': 'bg-md-primary/10 text-md-primary border-md-primary/20',
                'COMPLETED': 'bg-md-success/10 text-md-success border-md-success/20'
            };
            return classes[status] || classes['PENDING'];
        };

        const getStatusLabel = (status) => {
            const labels = {
                'PENDING': 'BOŞTA',
                'ASSIGNED': 'ATANMIŞ',
                'COMPLETED': 'ARŞİV'
            };
            return labels[status] || status;
        };

        const refreshCalls = () => {
            isRefreshing.value = true;
            setTimeout(() => {
                isRefreshing.value = false;
                updateTime();
                currentPage.value = 1;
            }, 500);
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) currentPage.value++;
        };

        const prevPage = () => {
            if (currentPage.value > 1) currentPage.value--;
        };

        onMounted(() => {
            updateTime();
            updateInterval = setInterval(updateTime, 60000);
        });

        onUnmounted(() => {
            if (updateInterval) clearInterval(updateInterval);
        });

        // External API for parent components
        const updateCallStatus = (callId, newData) => {
            const callIndex = allCalls.value.findIndex(call => call.id === callId);
            if (callIndex !== -1) {
                Object.assign(allCalls.value[callIndex], newData);
            }
        };

        return {
            paginatedCalls,
            filteredCalls, // badge gösterimi için gerekebilir
            allCalls,
            currentPage,
            totalPages,
            lastUpdate,
            isRefreshing,
            getStatusCompactClass,
            getStatusLabel,
            refreshCalls,
            updateCallStatus,
            nextPage,
            prevPage
        };
    }
};