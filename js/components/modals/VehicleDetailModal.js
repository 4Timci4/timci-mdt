/**
 * VEHICLE DETAIL MODAL
 */

export default {
    name: 'VehicleDetailModal',
    emits: ['close'],
    props: {
        vehicle: {
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
            <div v-if="show && vehicle" class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div class="absolute inset-0 bg-black/90 backdrop-blur-sm" @click="$emit('close')"></div>
                <div class="relative w-fit h-fit max-w-xl mx-auto bg-[#13131a] rounded-xl shadow-2xl border border-white/5 overflow-hidden animate-slide-up">
                    
                    <div class="px-6 py-4 bg-black/40 border-b border-white/5 flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="w-2 h-2 rounded-full" :class="vehicle.stolen ? 'bg-md-danger animate-pulse' : 'bg-md-success'"></div>
                            <h3 class="text-lg font-bold text-white uppercase tracking-wider font-mono">{{ vehicle.plate }}</h3>
                        </div>
                        <button @click="$emit('close')" class="text-white/40 hover:text-white transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                    </div>

                    <div class="p-5">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="col-span-2 bg-white/5 rounded-lg p-3 border border-white/5 flex items-center justify-between relative overflow-hidden">
                                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 opacity-20"></div>
                                <div>
                                    <p class="text-[9px] text-white/30 uppercase font-bold">Model</p>
                                    <p class="text-lg text-white font-bold">{{ vehicle.model }}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-[9px] text-white/30 uppercase font-bold">Renk</p>
                                    <p class="text-xs text-white flex items-center justify-end mt-0.5">
                                        {{ vehicle.color }}
                                        <span class="w-2.5 h-2.5 rounded-full border border-white/20 ml-2" :style="{ backgroundColor: 'white' }"></span>
                                    </p>
                                </div>
                            </div>

                            <div class="space-y-0.5">
                                <label class="text-[9px] text-white/30 uppercase font-bold tracking-wider">Araç Sahibi</label>
                                <p class="text-sm text-white border-b border-white/10 pb-0.5">{{ vehicle.owner }}</p>
                            </div>
                            <div class="space-y-0.5">
                                <label class="text-[9px] text-white/30 uppercase font-bold tracking-wider">Plaka</label>
                                <p class="text-sm text-white font-mono border-b border-white/10 pb-0.5 bg-yellow-500/10 text-yellow-500 w-fit px-1 rounded">{{ vehicle.plate }}</p>
                            </div>
                            <div class="space-y-0.5">
                                <label class="text-[9px] text-white/30 uppercase font-bold tracking-wider">Sigorta</label>
                                <p class="text-sm font-bold" :class="vehicle.insurance ? 'text-md-success' : 'text-md-danger'">
                                    {{ vehicle.insurance ? 'MEVCUT' : 'YOK' }}
                                </p>
                            </div>
                            <div class="space-y-0.5">
                                <label class="text-[9px] text-white/30 uppercase font-bold tracking-wider">Muayene</label>
                                <p class="text-sm font-bold" :class="vehicle.insurance ? 'text-md-success' : 'text-md-danger'">
                                    {{ vehicle.insurance ? 'GEÇERLİ' : 'GEÇERSİZ' }}
                                </p>
                            </div>
                            
                            <div class="col-span-2 mt-1">
                                <label class="text-[9px] text-white/30 uppercase font-bold tracking-wider mb-1.5 block">Durum Raporu</label>
                                <div v-if="vehicle.stolen" class="p-3 bg-md-danger/10 border border-md-danger/30 rounded-lg flex items-start space-x-2.5">
                                    <div class="p-1.5 bg-md-danger/20 rounded-full">
                                        <svg class="w-4 h-4 text-md-danger animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                                    </div>
                                    <div>
                                        <h4 class="text-xs font-bold text-md-danger">ÇALINTI ARAÇ İHBARI</h4>
                                        <p class="text-[10px] text-white/60 mt-0.5 leading-snug">Bu araç hakkında aktif çalıntı kaydı bulunmaktadır. Görüldüğü yerde müdahale edilmesi ve merkeze bildirilmesi gerekmektedir.</p>
                                    </div>
                                </div>
                                <div v-else class="p-3 bg-md-success/10 border border-md-success/20 rounded-lg flex items-center justify-between">
                                    <div class="flex items-center space-x-2.5">
                                        <div class="p-1.5 bg-md-success/20 rounded-full">
                                            <svg class="w-4 h-4 text-md-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                                        </div>
                                        <span class="text-xs font-bold text-md-success">TEMİZ KAYIT</span>
                                    </div>
                                    <span class="text-[9px] text-white/30 font-mono">Son Kontrol: BUGÜN</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Teleport>
    `
};