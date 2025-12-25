/**
 * CITIZEN DETAIL MODAL
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
    template: `
        <Teleport to="body">
            <div v-if="show && citizen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div class="absolute inset-0 bg-black/90 backdrop-blur-sm" @click="$emit('close')"></div>
                <div class="relative w-fit h-fit max-w-5xl mx-auto bg-[#13131a] rounded-xl shadow-2xl border border-white/5 overflow-hidden animate-slide-up">
                    
                    <!-- Header -->
                    <div class="px-6 py-4 bg-black/40 border-b border-white/5 flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="w-2 h-2 rounded-full" :class="citizen.warrant ? 'bg-md-danger animate-pulse' : 'bg-md-success'"></div>
                            <h3 class="text-lg font-bold text-white uppercase tracking-wider">KİŞİ SORGULAMASI</h3>
                        </div>
                        <button @click="$emit('close')" class="text-white/40 hover:text-white transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                    </div>

                    <div class="grid grid-cols-3 divide-x divide-white/5 h-fit">
                        
                        <!-- Column 1: Kişisel Bilgiler -->
                        <div class="flex flex-col h-full bg-[#0f111a]">
                            <div class="px-4 py-3 border-b border-white/5 bg-black/20">
                                <h4 class="text-xs font-bold text-white uppercase tracking-widest flex items-center">
                                    <svg class="w-4 h-4 mr-2 text-md-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                    Kişisel Bilgiler
                                </h4>
                            </div>
                            <div class="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                                <!-- Photo -->
                                <div class="flex flex-col items-center">
                                    <div class="w-24 h-24 rounded-xl bg-white/5 border border-white/10 overflow-hidden shadow-lg mb-3 group relative">
                                        <img v-if="citizen.photo" :src="citizen.photo" class="w-full h-full object-cover">
                                        <div v-else class="w-full h-full flex items-center justify-center text-white/20">
                                            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                        </div>
                                        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                                            <span class="text-sm font-bold text-white uppercase">Fotoğrafı Güncelle</span>
                                        </div>
                                    </div>
                                    
                                    <!-- Quick Stats -->
                                    <div class="flex space-x-2">
                                        <span class="px-2 py-0.5 rounded bg-white/5 text-sm font-bold border border-white/10">{{ citizen.gender }}</span>
                                        <span class="px-2 py-0.5 rounded bg-white/5 text-sm font-bold border border-white/10">{{ citizen.dob }}</span>
                                    </div>
                                </div>

                                <!-- Data Grid -->
                                <div class="space-y-2.5">
                                    <div class="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                                        <label class="text-sm text-white/30 uppercase font-bold tracking-wider block mb-0.5">TC Kimlik No</label>
                                        <p class="text-sm text-white font-mono tracking-wide">{{ citizen.identifier }}</p>
                                    </div>

                                    <div class="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                                        <label class="text-sm text-white/30 uppercase font-bold tracking-wider block mb-0.5">Ad Soyad</label>
                                        <p class="text-sm text-white tracking-wide uppercase">{{ citizen.fullName }}</p>
                                    </div>
                                    
                                    <div class="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                                        <label class="text-sm text-white/30 uppercase font-bold tracking-wider block mb-0.5">İletişim</label>
                                        <p class="text-xs text-white">{{ citizen.phone }}</p>
                                    </div>

                                    <div class="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                                        <label class="text-sm text-white/30 uppercase font-bold tracking-wider block mb-0.5">Meslek</label>
                                        <p class="text-xs text-white">{{ citizen.job }}</p>
                                    </div>

                                    <div class="pt-1">
                                        <label class="text-sm text-white/30 uppercase font-bold tracking-wider block mb-1.5">Lisanslar</label>
                                        <div class="flex flex-wrap gap-1.5">
                                            <span v-for="license in citizen.licenses" :key="license" class="px-2 py-0.5 bg-md-success/10 text-md-success border border-md-success/20 rounded text-[10px] font-bold uppercase">{{ license }}</span>
                                            <span v-if="!citizen.licenses || citizen.licenses.length === 0" class="text-xs text-white/30 italic">Kayıtlı lisans yok.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Column 2: İlgili Davalar (Suç Kayıtları) -->
                        <div class="flex flex-col h-full bg-[#13131a]">
                            <div class="px-4 py-3 border-b border-white/5 bg-black/20 flex justify-between items-center">
                                <h4 class="text-xs font-bold text-white uppercase tracking-widest flex items-center">
                                    <svg class="w-4 h-4 mr-2 text-md-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                                    İlgili Davalar
                                </h4>
                                <span class="bg-md-danger/20 text-md-danger text-[10px] font-bold px-1.5 py-0.5 rounded border border-md-danger/20">{{ citizen.criminalRecord ? citizen.criminalRecord.length : 0 }}</span>
                            </div>
                            <div class="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                                <div v-if="citizen.warrant" class="p-2.5 bg-md-danger/10 border border-md-danger/40 rounded-lg animate-pulse">
                                    <div class="flex items-center space-x-2 text-md-danger mb-1">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                                        <span class="text-[10px] font-bold uppercase">Aktif Arama Kararı</span>
                                    </div>
                                    <p class="text-sm text-white/70 leading-snug">Şahıs hakkında silahlı soygun suçundan yakalama kararı bulunmaktadır.</p>
                                </div>

                                <div v-for="record in citizen.criminalRecord" :key="record.id"
                                     class="group p-2.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-md-danger/30 transition-all cursor-pointer">
                                    <div class="flex justify-between items-start mb-1.5">
                                        <span class="text-sm font-bold text-white group-hover:text-md-danger transition-colors">{{ record.crime }}</span>
                                        <span class="text-sm text-white/30 font-mono">{{ record.date }}</span>
                                    </div>
                                    <div class="flex items-center space-x-2 mb-2">
                                        <span class="text-sm px-1.5 py-0.5 bg-white/5 rounded text-white/50 border border-white/5">Hapis: {{ record.punishment }}</span>
                                        <span class="text-sm px-1.5 py-0.5 bg-white/5 rounded text-white/50 border border-white/5">Para: $5000</span>
                                    </div>
                                    <div class="pt-1.5 border-t border-white/5 flex justify-between items-center">
                                        <span class="text-[8px] text-white/30">Dosya No: #{{ 2023000 + record.id }}</span>
                                        <span class="text-[8px] text-white/30">Ofs. K. Wilson</span>
                                    </div>
                                </div>

                                <div v-if="!citizen.criminalRecord || citizen.criminalRecord.length === 0" class="h-full flex flex-col items-center justify-center text-center p-8 opacity-50">
                                    <svg class="w-10 h-10 text-md-success mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                    <p class="text-[10px] font-bold text-white">Temiz Sicil</p>
                                    <p class="text-sm text-white/50 mt-0.5">Sistemde herhangi bir suç kaydı bulunamadı.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Column 3: Memur Notları & Araçlar -->
                        <div class="flex flex-col h-full bg-[#0f111a]">
                            <div class="px-4 py-3 border-b border-white/5 bg-black/20">
                                <h4 class="text-xs font-bold text-white uppercase tracking-widest flex items-center">
                                    <svg class="w-4 h-4 mr-2 text-md-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                    Notlar & Varlıklar
                                </h4>
                            </div>
                            <div class="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-4">
                                <!-- Notes Section -->
                                <div>
                                    <div class="flex justify-between items-center mb-1.5">
                                        <label class="text-sm text-white/30 uppercase font-bold tracking-wider">Memur Notları</label>
                                        <button class="text-sm text-md-primary hover:text-white transition-colors uppercase font-bold">+ Not Ekle</button>
                                    </div>
                                    <div class="space-y-1.5">
                                        <div class="p-2.5 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                                            <p class="text-sm text-white/80 leading-relaxed">"Şahıs agresif tavırlar sergiliyor, yaklaşırken dikkatli olunmalı."</p>
                                            <div class="mt-1.5 flex justify-between items-center">
                                                <span class="text-[8px] text-yellow-500/60 font-bold">⚠️ DİKKAT</span>
                                                <span class="text-[8px] text-white/20">12.12.2024</span>
                                            </div>
                                        </div>
                                        <div class="p-2.5 bg-white/[0.03] border border-white/5 rounded-lg">
                                            <p class="text-sm text-white/60 leading-relaxed">"Rutin kontrolde işbirliği yaptı."</p>
                                            <div class="mt-1.5 flex justify-end">
                                                <span class="text-[8px] text-white/20">10.11.2024</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Assets Section -->
                                <div>
                                    <label class="text-sm text-white/30 uppercase font-bold tracking-wider block mb-1.5">Kayıtlı Araçlar</label>
                                    <div class="space-y-1.5">
                                        <div class="flex items-center justify-between p-2 bg-white/[0.03] rounded border border-white/5">
                                            <div class="flex items-center space-x-2.5">
                                                <div class="w-7 h-7 rounded bg-white/5 flex items-center justify-center">
                                                    <svg class="w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h8m-8 4h8m-4 4h.01M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"/></svg>
                                                </div>
                                                <div>
                                                    <p class="text-sm font-bold text-white">Ubermacht Oracle</p>
                                                    <p class="text-[8px] text-white/40 font-mono">34 ABC 34</p>
                                                </div>
                                            </div>
                                            <span class="w-1.5 h-1.5 rounded-full bg-md-success"></span>
                                        </div>
                                        <div class="flex items-center justify-between p-2 bg-white/[0.03] rounded border border-white/5">
                                            <div class="flex items-center space-x-2.5">
                                                <div class="w-7 h-7 rounded bg-white/5 flex items-center justify-center">
                                                    <svg class="w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h8m-8 4h8m-4 4h.01M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"/></svg>
                                                </div>
                                                <div>
                                                    <p class="text-sm font-bold text-white">Karin Kuruma</p>
                                                    <p class="text-[8px] text-white/40 font-mono">06 DEF 06</p>
                                                </div>
                                            </div>
                                            <span class="w-1.5 h-1.5 rounded-full bg-md-danger animate-pulse"></span>
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