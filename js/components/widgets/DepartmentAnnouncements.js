/**
 * DEPARTMENT ANNOUNCEMENTS WIDGET - LSPD THEME
 * Kurumsal ve resmi duyuru panosu
 */

export default {
    name: 'DepartmentAnnouncements',
    template: `
        <div class="bg-[#13131a] border border-white/5 rounded-xl overflow-hidden h-fit flex flex-col min-h-[480px]">
            <!-- Widget Header -->
            <div class="px-5 py-3 border-b border-white/5 flex items-center justify-between relative">
                <div class="flex items-center space-x-3">
                    <div class="relative">
                        <div class="w-8 h-8 rounded-lg bg-md-primary/10 flex items-center justify-center">
                            <svg class="w-5 h-5 text-md-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-base font-bold text-white tracking-widest uppercase leading-none">Departman Duyuruları</h3>
                        <p class="text-xs text-white/30 font-mono mt-1 uppercase">Resmi LSPD Bildirimleri</p>
                    </div>
                </div>
                <div class="flex items-center space-x-3">
                    <button class="px-3 py-1.5 text-xs font-bold rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5 uppercase tracking-tighter">
                        + Duyuru Ekle
                    </button>
                    <span class="badge badge-info text-[10px] px-2 py-1">{{ announcements.length }} YENİ</span>
                </div>
            </div>

            <!-- Announcements List -->
            <div class="flex-1 overflow-hidden flex flex-col p-4 space-y-3">
                <div class="flex-1 overflow-y-auto custom-scrollbar space-y-3">
                    <div v-for="announcement in paginatedAnnouncements" :key="announcement.id"
                         class="bg-[#1a1a24]/50 border border-white/5 rounded-lg p-3 hover:bg-[#1a1a24] hover:border-white/10 transition-all cursor-pointer group">
                        <div class="flex items-start justify-between mb-1.5">
                            <div class="flex items-center space-x-2">
                                <span :class="[
                                    'px-1.5 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider border',
                                    getCategoryClass(announcement.category)
                                ]">
                                    {{ announcement.category }}
                                </span>
                                <span class="text-[10px] text-white/30 font-mono">{{ announcement.date }}</span>
                            </div>
                        </div>
                        <h4 class="text-xs font-bold text-white/90 mb-1 group-hover:text-md-primary transition-colors">{{ announcement.title }}</h4>
                        <p class="text-[11px] text-white/60 leading-relaxed line-clamp-2">{{ announcement.content }}</p>
                        <div class="mt-2 flex items-center justify-between">
                            <span class="text-[9px] text-white/30">Yayınlayan: {{ announcement.author }}</span>
                            <svg class="w-3 h-3 text-white/20 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination Footer -->
            <div class="px-5 py-2.5 border-t border-white/5 flex items-center justify-between bg-black/20">
                <div class="text-[10px] text-white/30 font-mono">
                    SAYFA {{ currentPage }} / {{ totalPages }}
                </div>
                <div class="flex items-center space-x-2">
                    <button @click="prevPage"
                            :disabled="currentPage === 1"
                            class="p-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all text-white/60">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                    </button>
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
        const { ref, computed } = Vue;

        const allAnnouncements = ref([
            {
                id: 1,
                title: 'Haftalık Toplantı ve Brifing',
                content: 'Tüm departman personelinin dikkatine. Bu Cuma saat 20:00\'da Mission Row PD brifing odasında zorunlu haftalık değerlendirme toplantısı yapılacaktır. Katılım zorunludur.',
                author: 'Chief A. Richardson',
                date: '25.12.2024',
                category: 'GENEL',
                pinned: true
            },
            {
                id: 2,
                title: 'Yeni Ekipman Dağıtımı',
                content: 'Çeyrek dönem tedarik planlaması kapsamında yeni nesil Taser cihazları depoya ulaşmıştır. Tüm saha memurlarının eski cihazlarını teslim edip yenilerini zimmetine almaları gerekmektedir.',
                author: 'Lt. S. Miller',
                date: '24.12.2024',
                category: 'LOJİSTİK',
                pinned: false
            },
            {
                id: 3,
                title: 'Trafik Denetim Protokolü Güncellemesi',
                content: 'Yüksek riskli trafik durdurma prosedürlerinde (Code 5) yapılan değişiklikler e-posta ile tüm birimlere iletilmiştir. Lütfen vardiya öncesi protokolü inceleyiniz.',
                author: 'Sgt. K. Wilson',
                date: '23.12.2024',
                category: 'EĞİTİM',
                pinned: false
            },
            {
                id: 4,
                title: 'Aranan Şahıs Yakalaması - Tebrik',
                content: 'Dün gece gerçekleşen operasyonda "Kırmızı Başlıklı Soyguncu" lakaplı şüphelinin yakalanmasında gösterdikleri üstün başarıdan dolayı Alpha-1 ekibini tebrik ederim.',
                author: 'Capt. J. Doe',
                date: '22.12.2024',
                category: 'BAŞARI',
                pinned: false
            },
            {
                id: 5,
                title: 'Araç Bakım Günü',
                content: 'Garaj amirliğinden bildirilmiştir: 100-150 kodlu devriye araçlarının yarın sabah 08:00 itibariyle periyodik bakıma girmesi gerekmektedir.',
                author: 'Tech. M. Brown',
                date: '21.12.2024',
                category: 'TEKNİK',
                pinned: false
            }
        ]);

        const currentPage = ref(1);
        const itemsPerPage = 3;

        const totalPages = computed(() => Math.ceil(allAnnouncements.value.length / itemsPerPage));

        const paginatedAnnouncements = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            return allAnnouncements.value.slice(start, start + itemsPerPage);
        });

        const prevPage = () => {
            if (currentPage.value > 1) currentPage.value--;
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) currentPage.value++;
        };

        const getCategoryClass = (category) => {
            const classes = {
                'GENEL': 'bg-white/10 text-white/80 border-white/10',
                'LOJİSTİK': 'bg-md-warning/10 text-md-warning border-md-warning/20',
                'EĞİTİM': 'bg-md-info/10 text-md-accent border-md-accent/20',
                'BAŞARI': 'bg-md-success/10 text-md-success border-md-success/20',
                'TEKNİK': 'bg-white/5 text-white/50 border-white/10'
            };
            return classes[category] || classes['GENEL'];
        };

        const getInitials = (name) => {
            return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        };

        return {
            announcements: allAnnouncements,
            paginatedAnnouncements,
            currentPage,
            totalPages,
            prevPage,
            nextPage,
            getCategoryClass,
            getInitials
        };
    }
};