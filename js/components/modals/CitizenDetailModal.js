/**
 * HYPER-REALISTIC CITIZEN DETAIL MODAL
 * Ultra-professional police terminal interface
 */

export default {
    name: 'CitizenDetailModal',
    emits: ['close'],
    props: {
        citizen: {
            type: Object,
            default: null
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        citizenRiskLevel() {
            if (!this.citizen) return 'LOW';
            const criminalCount = this.citizen.criminalRecord ? this.citizen.criminalRecord.length : 0;
            if (this.citizen.warrant) return 'CRITICAL';
            if (criminalCount >= 3) return 'HIGH';
            if (criminalCount >= 1) return 'MEDIUM';
            return 'LOW';
        },
        
        riskLevelClass() {
            const levels = {
                'CRITICAL': 'bg-red-500/15 border-red-500/40 text-red-300',
                'HIGH': 'bg-orange-500/15 border-orange-500/40 text-orange-300',
                'MEDIUM': 'bg-yellow-500/15 border-yellow-500/40 text-yellow-300',
                'LOW': 'bg-green-500/15 border-green-500/40 text-green-300'
            };
            return levels[this.citizenRiskLevel] || levels.LOW;
        },

        currentDateTime() {
            return new Date().toLocaleString('tr-TR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
    },
    template: `
        <Teleport to="body">
            <div v-if="show && citizen" class="fixed inset-0 z-50 flex items-center justify-center p-3">
                <!-- Minimal backdrop -->
                <div class="absolute inset-0 bg-black/90 backdrop-blur-lg"
                     @click="$emit('close')"></div>
                
                <!-- Main terminal window -->
                <div class="relative w-full max-w-7xl mx-auto bg-[#13131a] rounded-xl
                            border border-white/10 overflow-hidden animate-slide-up">
                    
                    <!-- Terminal Header with System Info -->
                    <div class="px-6 py-4 bg-[#0f0f14] border-b border-white/10 flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <!-- System Status Indicator -->
                            <div class="flex items-center space-x-2">
                                <div class="status-dot active"></div>
                                <span class="text-xs text-white/40 font-mono uppercase">LSPD TERMINAL</span>
                            </div>
                            
                            <!-- Risk Assessment Banner -->
                            <div :class="['px-3 py-1.5 rounded border font-mono text-xs font-bold uppercase tracking-wider', riskLevelClass]">
                                <span class="flex items-center space-x-1.5">
                                    <div class="w-1.5 h-1.5 rounded-full bg-current"></div>
                                    <span>{{ citizenRiskLevel }} RISK</span>
                                </span>
                            </div>
                            
                            <div class="h-6 w-px bg-white/20"></div>
                            
                            <!-- Session Info -->
                            <div class="flex items-center space-x-4 text-xs text-white/50 font-mono">
                                <span>QUERY ID: #{{ Math.floor(Math.random() * 100000) + 10000 }}</span>
                                <span>{{ currentDateTime }}</span>
                                <span class="text-blue-400">OFF. {{ 'K.WILSON' }}</span>
                            </div>
                        </div>
                        
                        <button @click="$emit('close')"
                                class="w-8 h-8 rounded bg-white/5 hover:bg-white/10 border border-white/10
                                       text-white/40 hover:text-white transition-all duration-200
                                       flex items-center justify-center">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <!-- Main Terminal Interface -->
                    <div class="grid grid-cols-12 h-[75vh] bg-[#13131a]">
                        
                        <!-- Left Panel: Citizen Profile -->
                        <div class="col-span-4 bg-[#0f111a] border-r border-white/10 flex flex-col">
                            <div class="px-5 py-4 bg-[#0a0b0f] border-b border-white/10">
                                <h4 class="text-sm font-bold text-white uppercase tracking-widest flex items-center">
                                    <div class="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center mr-3">
                                        <svg class="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                        </svg>
                                    </div>
                                    Vatandaş Profili
                                </h4>
                            </div>
                            
                            <div class="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
                                <!-- Enhanced Photo Section -->
                                <div class="flex flex-col items-center">
                                    <div class="relative">
                                        <div class="w-32 h-32 rounded-xl bg-white/5 border border-white/20 overflow-hidden mb-4">
                                            <img v-if="citizen.photo" :src="citizen.photo" class="w-full h-full object-cover">
                                            <div v-else class="w-full h-full flex items-center justify-center text-white/30">
                                                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        
                                        <!-- Verification badge -->
                                        <div class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white/10 border border-white/20
                                                    flex items-center justify-center">
                                            <svg class="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <!-- Enhanced citizen stats -->
                                    <div class="flex flex-wrap justify-center gap-2">
                                        <span class="badge badge-info">{{ citizen.gender }}</span>
                                        <span class="badge badge-info">{{ citizen.dob }}</span>
                                    </div>
                                </div>

                                <!-- Enhanced Data Fields -->
                                <div class="space-y-4">
                                    <div class="modern-card p-4 hover:border-blue-500/30 transition-all duration-300 group">
                                        <label class="text-xs text-white/40 uppercase font-bold tracking-wider block mb-2 flex items-center">
                                            <div class="w-1 h-1 rounded-full bg-blue-400 mr-2"></div>
                                            TC Kimlik No
                                        </label>
                                        <p class="text-base text-white font-mono tracking-wider group-hover:text-blue-300 transition-colors">
                                            {{ citizen.identifier }}
                                        </p>
                                    </div>

                                    <div class="modern-card p-4 hover:border-blue-500/30 transition-all duration-300 group">
                                        <label class="text-xs text-white/40 uppercase font-bold tracking-wider block mb-2 flex items-center">
                                            <div class="w-1 h-1 rounded-full bg-blue-400 mr-2"></div>
                                            Ad Soyad
                                        </label>
                                        <p class="text-lg font-bold text-white tracking-wide uppercase group-hover:text-blue-300 transition-colors">
                                            {{ citizen.fullName }}
                                        </p>
                                    </div>
                                    
                                    <div class="modern-card p-4 hover:border-blue-500/30 transition-all duration-300 group">
                                        <label class="text-xs text-white/40 uppercase font-bold tracking-wider block mb-2 flex items-center">
                                            <div class="w-1 h-1 rounded-full bg-blue-400 mr-2"></div>
                                            İletişim
                                        </label>
                                        <p class="text-base text-white mono-data group-hover:text-blue-300 transition-colors">{{ citizen.phone }}</p>
                                    </div>

                                    <div class="modern-card p-4 hover:border-blue-500/30 transition-all duration-300 group">
                                        <label class="text-xs text-white/40 uppercase font-bold tracking-wider block mb-2 flex items-center">
                                            <div class="w-1 h-1 rounded-full bg-blue-400 mr-2"></div>
                                            Meslek
                                        </label>
                                        <p class="text-base text-white group-hover:text-blue-300 transition-colors">{{ citizen.job }}</p>
                                    </div>

                                    <!-- Enhanced licenses section -->
                                    <div class="modern-card p-4">
                                        <label class="text-xs text-white/40 uppercase font-bold tracking-wider block mb-3 flex items-center">
                                            <div class="w-1 h-1 rounded-full bg-green-400 mr-2"></div>
                                            Aktif Lisanslar
                                        </label>
                                        <div class="flex flex-wrap gap-2">
                                            <span v-for="license in citizen.licenses" :key="license"
                                                  class="badge badge-success hover:scale-105 transition-transform cursor-pointer">
                                                {{ license }}
                                            </span>
                                            <span v-if="!citizen.licenses || citizen.licenses.length === 0"
                                                  class="text-sm text-white/30 italic">Kayıtlı lisans bulunmamaktadır.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Center Panel: Criminal Records -->
                        <div class="col-span-5 flex flex-col bg-[#13131a] border-r border-white/10">
                            <div class="px-5 py-4 bg-[#0a0b0f] border-b border-white/10 flex justify-between items-center">
                                <h4 class="text-sm font-bold text-white uppercase tracking-widest flex items-center">
                                    <div class="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center mr-3">
                                        <svg class="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                        </svg>
                                    </div>
                                    Suç Kayıtları
                                </h4>
                                <div class="flex items-center space-x-3">
                                    <span class="badge badge-danger text-xs">
                                        {{ citizen.criminalRecord ? citizen.criminalRecord.length : 0 }} KAYIT
                                    </span>
                                    <div class="w-2 h-2 rounded-full bg-red-400"></div>
                                </div>
                            </div>
                            
                            <div class="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
                                <!-- Active Warrant Alert -->
                                <div v-if="citizen.warrant"
                                     class="p-4 bg-red-500/10 border border-red-500/30 rounded">
                                    <div class="flex items-center space-x-3 mb-3">
                                        <div class="w-10 h-10 rounded bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                                            <svg class="w-5 h-5 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h5 class="text-sm font-bold text-red-300 uppercase">Aktif Yakalama Kararı</h5>
                                            <p class="text-xs text-red-200/70 font-mono">WARRANT ID: #W2023-{{ Math.floor(Math.random() * 1000) + 100 }}</p>
                                        </div>
                                    </div>
                                    <p class="text-sm text-white/90 leading-relaxed bg-black/20 p-3 rounded border border-red-500/20">
                                        Şahıs hakkında silahlı soygun suçundan yakalama kararı bulunmaktadır.
                                        <span class="text-red-300 font-bold">Dikkatli yaklaşım gereklidir.</span>
                                    </p>
                                </div>

                                <!-- Criminal Records -->
                                <div v-for="(record, index) in citizen.criminalRecord" :key="record.id"
                                     class="modern-card p-4 hover:border-white/20 transition-all duration-200">
                                    <div class="flex justify-between items-start mb-3">
                                        <div class="flex items-center space-x-2">
                                            <div class="w-2 h-2 rounded-full bg-orange-500"></div>
                                            <span class="text-base font-bold text-white">
                                                {{ record.crime }}
                                            </span>
                                        </div>
                                        <span class="text-sm text-white/40 mono-data">{{ record.date }}</span>
                                    </div>
                                    
                                    <div class="grid grid-cols-2 gap-3 mb-3">
                                        <div class="bg-white/5 p-2 rounded border border-white/10">
                                            <label class="text-xs text-white/30 block">Hapis Cezası</label>
                                            <span class="text-sm font-bold text-white">{{ record.punishment }}</span>
                                        </div>
                                        <div class="bg-white/5 p-2 rounded border border-white/10">
                                            <label class="text-xs text-white/30 block">Para Cezası</label>
                                            <span class="text-sm font-bold text-white mono-data">$5,000</span>
                                        </div>
                                    </div>
                                    
                                    <div class="pt-3 border-t border-white/10 flex justify-between items-center">
                                        <span class="text-xs text-white/40 mono-data">CASE #{{ 2023000 + record.id }}</span>
                                        <span class="text-xs text-white/40">Ofs. K. Wilson</span>
                                    </div>
                                </div>

                                <!-- Clean Record Display -->
                                <div v-if="!citizen.criminalRecord || citizen.criminalRecord.length === 0"
                                     class="h-full flex flex-col items-center justify-center text-center p-8">
                                    <div class="w-16 h-16 rounded bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                                        <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <h5 class="text-lg font-bold text-green-400 mb-2">Temiz Sicil</h5>
                                    <p class="text-sm text-white/50 max-w-xs">
                                        Bu şahıs hakkında sistemde herhangi bir suç kaydı bulunmamaktadır.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Right Panel: Notes & Assets -->
                        <div class="col-span-3 flex flex-col bg-[#0f111a]">
                            <div class="px-5 py-4 bg-[#0a0b0f] border-b border-white/10">
                                <h4 class="text-sm font-bold text-white uppercase tracking-widest flex items-center">
                                    <div class="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center mr-3">
                                        <svg class="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                        </svg>
                                    </div>
                                    Intel & Varlıklar
                                </h4>
                            </div>
                            
                            <div class="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-5">
                                <!-- Enhanced Notes Section -->
                                <div>
                                    <div class="flex justify-between items-center mb-3">
                                        <label class="text-xs text-white/40 uppercase font-bold tracking-wider">
                                            Operasyon Notları
                                        </label>
                                        <button class="btn-modern px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10
                                                       text-white/60 text-xs">
                                            + Ekle
                                        </button>
                                    </div>
                                    
                                    <div class="space-y-3">
                                        <div v-if="citizen.notes && citizen.notes.length > 0">
                                            <div v-for="note in citizen.notes" :key="note.id"
                                                 class="modern-card p-3 hover:border-white/20 transition-all duration-200"
                                                 :class="note.type === 'danger' ? 'border-yellow-500/30 bg-yellow-500/5' : ''">
                                                <div class="flex items-start space-x-2 mb-2">
                                                    <div v-if="note.type === 'danger'" class="w-5 h-5 rounded bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <svg class="w-3 h-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                                        </svg>
                                                    </div>
                                                    <div v-else class="w-5 h-5 rounded bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <svg class="w-3 h-3 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                        </svg>
                                                    </div>
                                                    <p class="text-sm text-white/80 leading-relaxed flex-1">{{ note.text }}</p>
                                                </div>
                                                <div class="flex justify-between items-center pt-2 border-t border-white/10">
                                                    <span v-if="note.type === 'danger'" class="badge badge-warning text-[10px]">Dikkat</span>
                                                    <span v-else class="badge badge-info text-[10px]">Bilgi</span>
                                                    <span class="text-xs text-white/30 mono-data">{{ note.date }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else class="text-center py-6 opacity-50">
                                            <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                                                <svg class="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                </svg>
                                            </div>
                                            <p class="text-xs text-white/30">Henüz not eklenmemiş</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Assets Section -->
                                <div>
                                    <label class="text-xs text-white/40 uppercase font-bold tracking-wider block mb-3">
                                        Kayıtlı Araçlar
                                    </label>
                                    
                                    <div class="space-y-3">
                                        <div v-if="citizen.assets && citizen.assets.length > 0">
                                            <div v-for="asset in citizen.assets" :key="asset.id"
                                                 class="modern-card p-3 hover:border-white/20 transition-all duration-200">
                                                <div class="flex items-center justify-between mb-2">
                                                    <div class="flex items-center space-x-3">
                                                        <div class="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center">
                                                            <svg class="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm font-bold text-white">
                                                                {{ asset.model }}
                                                            </p>
                                                            <p class="text-xs text-white/50 mono-data">{{ asset.plate }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="status-dot" :class="asset.status === 'danger' ? 'danger' : 'active'"></div>
                                                </div>
                                                <div class="grid grid-cols-2 gap-2 text-xs">
                                                    <span class="text-white/40">Status:</span>
                                                    <span :class="asset.status === 'danger' ? 'text-red-300' : 'text-green-300'">
                                                        {{ asset.status === 'danger' ? 'FLAGGED' : 'CLEAR' }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else class="text-center py-6 opacity-50">
                                            <div class="w-12 h-12 rounded bg-white/5 flex items-center justify-center mx-auto mb-3">
                                                <svg class="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                                                </svg>
                                            </div>
                                            <p class="text-xs text-white/30">Kayıtlı araç bulunamadı</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    `
};