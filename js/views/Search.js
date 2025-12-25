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
        const { ref, computed } = Vue;

        const searchType = ref('citizen'); // 'citizen' or 'vehicle'
        const searchQuery = ref('');
        const isSearching = ref(false);
        const hasSearched = ref(false);
        const results = ref([]);
        const showDetailModal = ref(false);
        const selectedResult = ref(null);

        const searchPlaceholder = computed(() => {
            return searchType.value === 'citizen' 
                ? 'İsim Soyisim veya TC Kimlik No...' 
                : 'Araç Plakası veya Şasi No...';
        });

        // Mock Database
        const mockCitizens = [
            { id: 1, fullName: 'Ahmet Yılmaz', identifier: '12345678901', dob: '15.05.1990', gender: 'Erkek', phone: '555-0101', job: 'Taksici', warrant: false, licenses: ['B Sınıfı', 'Silah Taşıma'], criminalRecord: [], photo: null },
            { id: 2, fullName: 'Mehmet Demir', identifier: '23456789012', dob: '22.08.1985', gender: 'Erkek', phone: '555-0202', job: 'İşsiz', warrant: true, licenses: ['B Sınıfı'], criminalRecord: [{id: 1, crime: 'Hırsızlık', date: '10.01.2023', punishment: '2 Yıl Hapis'}], photo: null },
            { id: 3, fullName: 'Ayşe Kaya', identifier: '34567890123', dob: '10.12.1995', gender: 'Kadın', phone: '555-0303', job: 'Hemşire', warrant: false, licenses: ['B Sınıfı'], criminalRecord: [], photo: null }
        ];

        const mockVehicles = [
            { id: 1, plate: '34 ABC 34', model: 'Ubermacht Oracle', color: 'Siyah', owner: 'Ahmet Yılmaz', stolen: false, insurance: true },
            { id: 2, plate: '06 DEF 06', model: 'Karin Kuruma', color: 'Beyaz', owner: 'Mehmet Demir', stolen: true, insurance: false },
            { id: 3, plate: '35 GHI 35', model: 'Pfister Comet', color: 'Kırmızı', owner: 'Ayşe Kaya', stolen: false, insurance: true }
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