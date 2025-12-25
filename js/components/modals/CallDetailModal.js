/**
 * CALL DETAIL MODAL - COMPACT & REALISTIC REDESIGN
 */

export default {
    name: 'CallDetailModal',
    emits: ['close', 'claim-call', 'complete-call'],
    props: {
        call: {
            type: Object,
            default: null
        },
        show: {
            type: Boolean,
            default: false
        },
        currentOfficer: {
            type: Object,
            default: () => ({
                name: 'Memur K. Wilson',
                badge: 'LSPD-4521',
                callSign: 'Unit-12'
            })
        }
    },
    template: `
        <Teleport to="body">
            <div v-if="show" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-hidden">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/90" @click="$emit('close')"></div>
                
                <!-- Compact Modal Container -->
                <div class="relative w-full max-w-xl bg-[#13131a] rounded-xl shadow-2xl border border-white/5 flex flex-col overflow-hidden max-h-[85vh]">
                    
                    <!-- Top Status Bar (Realistic Terminal Look) -->
                    <div class="px-4 py-2 bg-black/40 border-b border-white/5 flex items-center justify-between text-[10px] tracking-widest font-mono text-white/40">
                        <div class="flex items-center space-x-3">
                            <span class="flex items-center"><span class="w-1.5 h-1.5 bg-md-primary rounded-full mr-2"></span>LSPD TERMINAL v4.2</span>
                            <span>ID: {{ call.callId }}</span>
                        </div>
                        <div class="flex items-center space-x-4">
                            <span>{{ call.timeAgo }}</span>
                            <button @click="$emit('close')" class="hover:text-white transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                        </div>
                    </div>

                    <!-- Compact Header -->
                    <div class="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                        <div class="flex items-center space-x-4">
                            <div :class="[
                                'w-10 h-10 rounded-lg flex items-center justify-center shadow-lg transition-all duration-500',
                                call.priority === 'CRITICAL' ? 'bg-md-danger shadow-md-danger/20' : 'bg-md-primary/20 text-md-primary'
                            ]">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-lg font-bold text-white tracking-tight uppercase leading-none">{{ call.type }}</h2>
                                <p class="text-xs text-white/40 font-mono mt-1">{{ call.district }}</p>
                            </div>
                        </div>
                        <div :class="[
                            'px-2 py-1 rounded text-[10px] font-bold border tracking-widest',
                            getStatusCompactClass(call.status)
                        ]">
                            {{ getStatusLabel(call.status) }}
                        </div>
                    </div>

                    <!-- Scrollable Content -->
                    <div class="flex-1 overflow-y-auto custom-scrollbar">
                        
                        <!-- Main Info Grid -->
                        <div class="p-5 grid grid-cols-2 gap-4 border-b border-white/5">
                            <div class="space-y-1">
                                <label class="text-[9px] uppercase tracking-widest text-white/30 font-bold">Adres Bilgisi</label>
                                <p class="text-xs text-white/80 font-mono leading-snug">{{ call.address }}</p>
                            </div>
                            <div class="space-y-1 text-right">
                                <label class="text-[9px] uppercase tracking-widest text-white/30 font-bold">İhbarcı</label>
                                <p class="text-xs text-white/80 leading-snug">{{ call.caller }}</p>
                                <p class="text-[10px] text-white/40 font-mono leading-none">{{ call.callerPhone }}</p>
                            </div>
                        </div>

                        <!-- Incident Log / Message -->
                        <div class="p-5 space-y-3">
                            <label class="text-[9px] uppercase tracking-widest text-white/30 font-bold flex items-center">
                                <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
                                Olay Kaydı
                            </label>
                            <div class="p-3 bg-white/[0.03] border border-white/5 rounded-lg">
                                <p class="text-[13px] text-white/70 leading-relaxed italic">"{{ call.message }}"</p>
                            </div>
                        </div>

                        <!-- Assignment Section -->
                        <div v-if="call.status !== 'PENDING'" class="px-5 pb-5 animate-fade-in">
                             <div class="p-4 rounded-lg bg-md-primary/5 border border-md-primary/10 flex items-center justify-between">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 rounded bg-md-primary/10 flex items-center justify-center">
                                        <svg class="w-4 h-4 text-md-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                    </div>
                                    <div>
                                        <p class="text-xs font-bold text-white/90 uppercase">{{ call.assignedOfficer }}</p>
                                        <p class="text-[10px] text-white/40 font-mono">{{ call.assignedBadgeNumber }}</p>
                                    </div>
                                </div>
                                <div v-if="call.status === 'ASSIGNED'" class="flex flex-col items-end">
                                    <span class="text-[9px] text-white/30 uppercase tracking-tighter">İşlem Zamanı</span>
                                    <span class="text-[11px] text-white/60 font-mono">{{ formatAssignedTime(call.assignedAt) }}</span>
                                </div>
                             </div>

                             <!-- Officer Note Display (If COMPLETED) -->
                             <div v-if="call.status === 'COMPLETED' && call.officerNote" class="mt-3 p-3 bg-md-success/5 border border-md-success/10 rounded-lg animate-fade-in">
                                <p class="text-[9px] uppercase tracking-widest text-md-success/60 font-bold mb-1.5">Kapatma Notu</p>
                                <p class="text-xs text-white/60 leading-relaxed italic">"{{ call.officerNote }}"</p>
                             </div>

                             <!-- Note Entry Area (Only for assigned officer) -->
                             <div v-if="call.status === 'ASSIGNED' && call.assignedBadgeNumber === currentOfficer.badge" class="mt-4 space-y-2 animate-fade-in">
                                <label class="text-[9px] uppercase tracking-widest text-white/30 font-bold">Rapor / Sonuç</label>
                                <textarea v-model="officerNote"
                                          placeholder="Olay sonucunu buraya not alınız..."
                                          class="w-full h-20 p-3 text-xs bg-black/40 border border-white/5 rounded-lg focus:border-md-primary/40 text-white/80 transition-all resize-none"></textarea>
                             </div>
                        </div>
                    </div>

                    <!-- Footer Action Bar -->
                    <div class="px-5 py-4 bg-black/20 border-t border-white/5 flex items-center space-x-3">
                        
                        <!-- PENDING: Üstlen & GPS -->
                        <template v-if="call.status === 'PENDING'">
                            <button @click="claimCall"
                                    :disabled="isClaimingCall"
                                    class="flex-1 h-11 rounded-lg bg-md-primary hover:bg-md-primary2 text-white text-xs font-bold uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center">
                                <span v-if="!isClaimingCall">ÇAĞRIYI ÜSTLEN</span>
                                <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                            </button>
                            <button @click="setWaypoint"
                                    class="w-12 h-11 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white flex items-center justify-center transition-all border border-white/5">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            </button>
                        </template>

                        <!-- ASSIGNED: Tamamla & GPS -->
                        <template v-else-if="call.status === 'ASSIGNED'">
                            <button v-if="call.assignedBadgeNumber === currentOfficer.badge"
                                    @click="completeCall"
                                    :disabled="isCompletingCall"
                                    class="flex-1 h-11 rounded-lg bg-md-success hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center shadow-lg shadow-md-success/10">
                                <span v-if="!isCompletingCall">ÇAĞRIYI SONUÇLANDIR</span>
                                <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                            </button>
                            <button @click="setWaypoint"
                                    :class="[
                                        'h-11 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white flex items-center justify-center transition-all border border-white/5',
                                        call.assignedBadgeNumber === currentOfficer.badge ? 'w-12' : 'flex-1 space-x-2'
                                    ]">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                <span v-if="call.assignedBadgeNumber !== currentOfficer.badge" class="text-xs font-bold uppercase tracking-widest">KONUMA SEVK ET</span>
                            </button>
                        </template>

                        <!-- COMPLETED: Sadece Bilgi -->
                        <div v-else class="w-full flex items-center justify-center h-11 text-[11px] font-bold text-md-success/80 tracking-[0.2em] uppercase">
                            ARŞİVLENMİŞ ÇAĞRI KAYDI
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    `,
    setup(props, { emit }) {
        const { ref } = Vue;
        
        const isClaimingCall = ref(false);
        const isCompletingCall = ref(false);
        const officerNote = ref('');

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

        const getPriorityClass = (priority) => {
            const classes = {
                'CRITICAL': 'bg-md-danger text-white',
                'HIGH': 'bg-md-danger/30 text-md-danger border-md-danger/40',
                'MEDIUM': 'bg-md-accent/20 text-md-accent border-md-accent/30',
                'LOW': 'bg-white/10 text-white/60 border-white/10'
            };
            return classes[priority] || classes['LOW'];
        };

        const getPriorityLabel = (priority) => {
            const labels = { 'CRITICAL': 'ACİL', 'HIGH': 'YÜKSEK', 'MEDIUM': 'ORTA', 'LOW': 'RUTİN' };
            return labels[priority] || priority;
        };

        const formatAssignedTime = (timestamp) => {
            if (!timestamp) return '';
            const date = new Date(timestamp);
            return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        };

        const claimCall = async () => {
            if (isClaimingCall.value || props.call.status !== 'PENDING') return;
            isClaimingCall.value = true;
            try {
                await new Promise(resolve => setTimeout(resolve, 600));
                emit('claim-call', {
                    callId: props.call.id,
                    officer: {
                        name: props.currentOfficer.name,
                        badge: props.currentOfficer.badge,
                        callSign: props.currentOfficer.callSign
                    },
                    timestamp: new Date().toISOString()
                });
            } finally {
                isClaimingCall.value = false;
            }
        };

        const completeCall = async () => {
            if (isCompletingCall.value || props.call.status !== 'ASSIGNED') return;
            isCompletingCall.value = true;
            try {
                await new Promise(resolve => setTimeout(resolve, 800));
                emit('complete-call', {
                    callId: props.call.id,
                    note: officerNote.value,
                    timestamp: new Date().toISOString()
                });
            } finally {
                isCompletingCall.value = false;
            }
        };

        const setWaypoint = () => {
            console.log('✅ Waypoint set:', props.call.address);
            emit('close');
        };

        return {
            isClaimingCall,
            isCompletingCall,
            officerNote,
            getStatusCompactClass,
            getStatusLabel,
            getPriorityClass,
            getPriorityLabel,
            formatAssignedTime,
            claimCall,
            completeCall,
            setWaypoint
        };
    }
};