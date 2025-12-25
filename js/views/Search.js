/**
 * SEARCH VIEW - LSPD BLUE THEME
 * Vatandaş ve Araç Sorgulama Paneli
 */

import CitizenDetailModal from '../components/modals/CitizenDetailModal.js';
import VehicleDetailModal from '../components/modals/VehicleDetailModal.js';

export default {
    name: 'Search',
    components: {
        CitizenDetailModal,
        VehicleDetailModal
    },
    template: `
        <div class="h-full flex flex-col p-6 animate-fade-in select-none">
            <!-- Search Header -->
            <div class="mb-8">
                <h2 class="text-2xl font-bold text-white tracking-tight">Veritabanı Sorgulama</h2>
                <p class="text-sm text-white/40 mt-1 font-mono">LSPD VERİTABANI BAĞLANTISI AKTİF</p>
            </div>

            <!-- Search Type Toggle & Input -->
            <div class="max-w-7xl mx-auto w-full space-y-6">
                
                <!-- Toggle Switches -->
                <div class="flex p-1 bg-[#1a1a24] rounded-xl border border-white/5 w-fit">
                    <button @click="searchType = 'citizen'"
                            :class="[
                                'px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 flex items-center space-x-2',
                                searchType === 'citizen' ? 'bg-md-primary text-white shadow-lg' : 'text-white/40 hover:text-white'
                            ]">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        <span>VATANDAŞ</span>
                    </button>
                    <button @click="searchType = 'vehicle'"
                            :class="[
                                'px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 flex items-center space-x-2',
                                searchType === 'vehicle' ? 'bg-md-primary text-white shadow-lg' : 'text-white/40 hover:text-white'
                            ]">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h8m-8 4h8m-4 4h.01M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"/></svg>
                        <span>ARAÇ</span>
                    </button>
                </div>

                <!-- Search Input Area -->
                <div class="relative group">
                    <div class="absolute inset-0 bg-md-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                    <div class="relative flex items-center bg-[#13131a] border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 group-focus-within:border-md-primary/50 group-focus-within:ring-1 group-focus-within:ring-md-primary/50">
                        <div class="pl-6 pr-4 text-white/30">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </div>
                        <input v-model="searchQuery"
                               @keyup.enter="performSearch"
                               type="text" 
                               :placeholder="searchPlaceholder"
                               class="w-full h-16 bg-transparent border-none text-lg text-white placeholder-white/20 focus:ring-0 font-mono tracking-wide">
                        <div class="pr-4">
                            <button @click="performSearch" 
                                    :disabled="!searchQuery.trim() || isSearching"
                                    class="px-6 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-xs font-bold text-white transition-all uppercase tracking-wider border border-white/5">
                                <span v-if="!isSearching">SORGULA</span>
                                <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                            </button>
                        </div>
                    </div>
                    <p class="mt-2 text-xs text-white/30 font-mono ml-2">
                        <span class="text-md-primary font-bold">İPUCU:</span> 
                        {{ searchType === 'citizen' ? 'Ad Soyad veya Kimlik No (11 hane)' : 'Plaka (Örn: 34 ABC 34) veya Şasi No' }}
                    </p>
                </div>

                <!-- Results Area -->
                <div v-if="hasSearched" class="mt-8 animate-fade-in">
                    
                    <!-- Loading State -->
                    <div v-if="isSearching" class="flex flex-col items-center justify-center py-12 space-y-4">
                        <div class="w-12 h-12 border-2 border-md-primary border-t-transparent rounded-full animate-spin"></div>
                        <p class="text-sm text-white/40 font-mono animate-pulse">VERİTABANI TARANIYOR...</p>
                    </div>

                    <!-- No Results -->
                    <div v-else-if="results.length === 0" class="bg-[#13131a] border border-white/5 rounded-xl p-8 text-center">
                        <div class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                        <h3 class="text-lg font-bold text-white mb-1">Eşleşme Bulunamadı</h3>
                        <p class="text-sm text-white/40">Girdiğiniz kriterlere uygun kayıt bulunmamaktadır.</p>
                    </div>

                    <!-- Results List -->
                    <div v-else class="space-y-4">
                        <div class="flex items-center justify-between mb-4 px-2">
                            <h3 class="text-sm font-bold text-white/60 uppercase tracking-widest">{{ results.length }} EŞLEŞME BULUNDU</h3>
                        </div>

                        <div v-for="result in results" :key="result.id"
                             @click="openDetail(result)"
                             class="bg-[#13131a] border border-white/5 hover:border-md-primary/50 hover:bg-[#1a1a24] rounded-xl p-4 cursor-pointer transition-all duration-300 group relative overflow-hidden">
                            
                            <!-- Hover Glow -->
                            <div class="absolute inset-0 bg-gradient-to-r from-md-primary/0 via-md-primary/5 to-md-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>

                            <div class="flex items-center justify-between relative z-10">
                                <div class="flex items-center space-x-4">
                                    <!-- Avatar/Icon -->
                                    <div class="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-md-primary/30 transition-colors">
                                        <svg v-if="searchType === 'citizen'" class="w-6 h-6 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                        <svg v-else class="w-6 h-6 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h8m-8 4h8m-4 4h.01M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"/></svg>
                                    </div>
                                    
                                    <!-- Main Info -->
                                    <div>
                                        <h4 class="text-base font-bold text-white group-hover:text-md-primary transition-colors">
                                            {{ searchType === 'citizen' ? result.fullName : result.plate }}
                                        </h4>
                                        <p class="text-xs text-white/40 font-mono mt-0.5">
                                            {{ searchType === 'citizen' ? result.identifier : result.model }}
                                        </p>
                                    </div>
                                </div>

                                <!-- Status Badges -->
                                <div class="flex items-center space-x-3">
                                    <span v-if="result.warrant" class="px-2 py-1 rounded text-[10px] font-bold bg-md-danger/20 text-md-danger border border-md-danger/30 uppercase tracking-wider animate-pulse">ARANIYOR</span>
                                    <span v-if="result.licensed" class="px-2 py-1 rounded text-[10px] font-bold bg-md-success/10 text-md-success border border-md-success/20 uppercase tracking-wider">LİSANSLI</span>
                                    <svg class="w-5 h-5 text-white/20 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modals -->
            <CitizenDetailModal 
                :show="showDetailModal && searchType === 'citizen'"
                :citizen="selectedResult"
                @close="closeDetail"
            />
            
            <VehicleDetailModal 
                :show="showDetailModal && searchType === 'vehicle'"
                :vehicle="selectedResult"
                @close="closeDetail"
            />

        </div>
    `,
    setup() {
        const { ref, computed, watch, onMounted } = Vue;

        // Restore state from localStorage
        const savedState = JSON.parse(localStorage.getItem('mdt_search_state') || '{}');

        const searchType = ref(savedState.searchType || 'citizen'); // 'citizen' or 'vehicle'
        const searchQuery = ref(savedState.searchQuery || '');
        const isSearching = ref(false);
        const hasSearched = ref(savedState.hasSearched || false);
        const results = ref(savedState.results || []);
        const showDetailModal = ref(savedState.showDetailModal || false);
        const selectedResult = ref(savedState.selectedResult || null);

        // Persist state changes
        const persistState = () => {
            const stateToSave = {
                searchType: searchType.value,
                searchQuery: searchQuery.value,
                hasSearched: hasSearched.value,
                results: results.value,
                showDetailModal: showDetailModal.value,
                selectedResult: selectedResult.value
            };
            localStorage.setItem('mdt_search_state', JSON.stringify(stateToSave));
        };

        watch([searchType, searchQuery, hasSearched, results, showDetailModal, selectedResult], () => {
            persistState();
        }, { deep: true });

        const searchPlaceholder = computed(() => {
            return searchType.value === 'citizen' 
                ? 'İsim Soyisim veya TC Kimlik No...' 
                : 'Araç Plakası veya Şasi No...';
        });

        // Mock Database
        const mockCitizens = [
            {
                id: 1,
                fullName: 'Ahmet Yılmaz',
                identifier: '12345678901',
                dob: '15.05.1990',
                gender: 'Erkek',
                phone: '555-0101',
                job: 'Taksici',
                warrant: false,
                licenses: ['B Sınıfı Ehliyet', 'Silah Taşıma Ruhsatı', 'Taksi Plakası Ruhsatı'],
                criminalRecord: [
                    {id: 1, crime: 'Trafik Kuralları İhlali', date: '15.03.2023', punishment: '500 TL Para Cezası'},
                    {id: 2, crime: 'Hız Sınırı Aşımı', date: '22.07.2022', punishment: '300 TL Para Cezası'}
                ],
                photo: null,
                notes: [
                    { id: 1, text: "Şahıs agresif tavırlar sergiliyor, yaklaşırken dikkatli olunmalı. Özellikle gece saatlerinde çok sinirli oluyor.", date: "12.12.2024", type: "danger" },
                    { id: 2, text: "Rutin kontrolde işbirliği yaptı, kibar ve saygılı davrandı.", date: "10.11.2024", type: "info" },
                    { id: 3, text: "Taksi durağında diğer şoförlerle kavga ettiği bildirildi.", date: "05.10.2024", type: "danger" }
                ],
                assets: [
                    { id: 1, model: "Ubermacht Oracle", plate: "34 ABC 34", status: "clean" },
                    { id: 2, model: "Karin Kuruma", plate: "06 DEF 06", status: "danger" }
                ]
            },
            {
                id: 2,
                fullName: 'Mehmet Demir',
                identifier: '23456789012',
                dob: '22.08.1985',
                gender: 'Erkek',
                phone: '555-0202',
                job: 'İşsiz',
                warrant: true,
                licenses: ['B Sınıfı Ehliyet'],
                criminalRecord: [
                    {id: 1, crime: 'Silahlı Soygun', date: '10.01.2023', punishment: '8 Yıl Hapis'},
                    {id: 2, crime: 'Uyuşturucu Bulundurma', date: '15.06.2022', punishment: '3 Yıl Hapis'},
                    {id: 3, crime: 'Sahte Evrak Düzenleme', date: '03.12.2021', punishment: '2 Yıl Hapis'}
                ],
                photo: null,
                notes: [
                    { id: 1, text: "Şahıs silahlı ve tehlikeli olarak değerlendiriliyor. Yaklaşımda maksimum güvenlik önlemi alınmalı.", date: "20.11.2024", type: "danger" },
                    { id: 2, text: "Uyuşturucu satıcıları ile irtibat halinde olduğu istihbar edilmiştir.", date: "15.09.2024", type: "danger" }
                ],
                assets: [
                    { id: 1, model: "Albany Primo", plate: "06 DEF 06", status: "danger" }
                ]
            },
            {
                id: 3,
                fullName: 'Ayşe Kaya',
                identifier: '34567890123',
                dob: '10.12.1995',
                gender: 'Kadın',
                phone: '555-0303',
                job: 'Hemşire',
                warrant: false,
                licenses: ['B Sınıfı Ehliyet', 'Sağlık Memuru Sertifikası', 'İlk Yardım Sertifikası'],
                criminalRecord: [],
                photo: null,
                notes: [
                    { id: 1, text: "Hastane acil servisinde görevli, çok yardımcı ve güvenilir bir kişi.", date: "08.12.2024", type: "info" },
                    { id: 2, text: "Trafik kazası sırasında yaralılara müdahale etmesinden dolayı teşekkür edildi.", date: "25.10.2024", type: "info" }
                ],
                assets: [
                    { id: 1, model: "Weeny Issi", plate: "35 GHI 35", status: "clean" }
                ]
            },
            {
                id: 4,
                fullName: 'Fatma Öztürk',
                identifier: '45678901234',
                dob: '03.07.1988',
                gender: 'Kadın',
                phone: '555-0404',
                job: 'Öğretmen',
                warrant: false,
                licenses: ['B Sınıfı Ehliyet', 'Öğretmenlik Sertifikası'],
                criminalRecord: [
                    {id: 1, crime: 'Park İhlali', date: '12.05.2024', punishment: '100 TL Para Cezası'}
                ],
                photo: null,
                notes: [],
                assets: [
                    { id: 1, model: "Vapid Prius", plate: "16 TUV 16", status: "clean" }
                ]
            },
            {
                id: 5,
                fullName: 'Ali Koç',
                identifier: '56789012345',
                dob: '18.09.1978',
                gender: 'Erkek',
                phone: '555-0505',
                job: 'Berber',
                warrant: false,
                licenses: ['B Sınıfı Ehliyet', 'Kuaför Sertifikası'],
                criminalRecord: [
                    {id: 1, crime: 'Kavga', date: '28.02.2023', punishment: '1000 TL Para Cezası'},
                    {id: 2, crime: 'Alkollü Araç Kullanma', date: '14.11.2022', punishment: '5000 TL Para Cezası + 6 Ay Ehliyet İptali'}
                ],
                photo: null,
                notes: [
                    { id: 1, text: "Alkol problemi olan şahıs, tedavi görmeye başlamış.", date: "20.08.2024", type: "info" }
                ],
                assets: [
                    { id: 1, model: "Vapid Prius", plate: "16 TUV 16", status: "clean" }
                ]
            }
        ];

        const mockVehicles = [
            {
                id: 1,
                plate: '34 ABC 34',
                model: 'Ubermacht Oracle',
                color: 'Siyah',
                owner: 'Ahmet Yılmaz',
                stolen: false,
                insurance: true
            },
            {
                id: 2,
                plate: '06 DEF 06',
                model: 'Karin Kuruma',
                color: 'Beyaz',
                owner: 'Mehmet Demir',
                stolen: true,
                insurance: false
            },
            {
                id: 3,
                plate: '35 GHI 35',
                model: 'Pfister Comet',
                color: 'Kırmızı',
                owner: 'Ayşe Kaya',
                stolen: false,
                insurance: true
            },
            {
                id: 4,
                plate: '16 TUV 16',
                model: 'Vapid Prius',
                color: 'Mavi',
                owner: 'Fatma Öztürk',
                stolen: false,
                insurance: true
            },
            {
                id: 5,
                plate: '07 MNO 07',
                model: 'Albany Primo',
                color: 'Gri',
                owner: 'Ali Koç',
                stolen: false,
                insurance: false
            },
            {
                id: 6,
                plate: '42 STU 42',
                model: 'Benefactor Dubsta',
                color: 'Siyah',
                owner: 'Bilinmeyen',
                stolen: true,
                insurance: false
            },
            {
                id: 7,
                plate: '01 XYZ 01',
                model: 'Enus Super Diamond',
                color: 'Altın',
                owner: 'Kemal Arslan',
                stolen: false,
                insurance: true
            },
            {
                id: 8,
                plate: '26 PQR 26',
                model: 'Weeny Issi',
                color: 'Pembe',
                owner: 'Zeynep Yıldız',
                stolen: false,
                insurance: true
            }
        ];

        const performSearch = () => {
            if (!searchQuery.value.trim()) return;

            isSearching.value = true;
            hasSearched.value = true;
            results.value = [];

            // Simulate API delay
            setTimeout(() => {
                const query = searchQuery.value.toLowerCase();
                
                if (searchType.value === 'citizen') {
                    results.value = mockCitizens.filter(c => 
                        c.fullName.toLowerCase().includes(query) || 
                        c.identifier.includes(query)
                    );
                } else {
                    results.value = mockVehicles.filter(v => 
                        v.plate.toLowerCase().includes(query) || 
                        v.model.toLowerCase().includes(query)
                    );
                }
                
                isSearching.value = false;
            }, 800);
        };

        const openDetail = (result) => {
            selectedResult.value = result;
            showDetailModal.value = true;
        };

        const closeDetail = () => {
            showDetailModal.value = false;
            selectedResult.value = null;
        };

        return {
            searchType,
            searchQuery,
            isSearching,
            hasSearched,
            results,
            searchPlaceholder,
            performSearch,
            showDetailModal,
            selectedResult,
            openDetail,
            closeDetail
        };
    }
};