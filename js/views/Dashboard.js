/**
 * DASHBOARD VIEW - LSPD BLUE THEME
 * Modern grid layout - Modal entegrasyonlu
 */

import ActiveCalls from '../components/widgets/ActiveCalls.js';
import DepartmentAnnouncements from '../components/widgets/DepartmentAnnouncements.js';
import CallDetailModal from '../components/modals/CallDetailModal.js';

export default {
    name: 'Dashboard',
    components: {
        ActiveCalls,
        DepartmentAnnouncements,
        CallDetailModal
    },
    template: `
        <div class="h-full flex flex-col select-none">
            <!-- Dashboard Content -->
            <div class="flex-1 p-4 overflow-auto custom-scrollbar">
                <div class="grid grid-cols-12 gap-5 h-full">
                    
                    <!-- Main Widgets Row -->
                    <div class="col-span-12 lg:col-span-7 h-[480px] animate-fade-in">
                        <ActiveCalls
                            ref="activeCallsRef"
                            data-component="ActiveCalls"
                            @open-call-detail="openCallDetail"
                        />
                    </div>

                    <div class="col-span-12 lg:col-span-5 h-[480px] animate-fade-in" style="animation-delay: 0.1s;">
                        <DepartmentAnnouncements />
                    </div>

                </div>
            </div>

            <!-- Call Detail Modal (Teleport to body) -->
            <CallDetailModal
                :call="selectedCall"
                :show="showCallModal"
                :current-officer="currentOfficer"
                @close="closeCallModal"
                @claim-call="onCallClaimed"
                @complete-call="onCallCompleted"
            />
        </div>
    `,
    setup() {
        const { ref, provide } = Vue;

        const stats = ref({
            activeOfficers: 12,
            pendingCalls: 5,
            emergencies: 1,
            reports: 23,
            reportsPending: 4
        });

        const selectedCall = ref(null);
        const showCallModal = ref(false);
        
        // Aktif memur bilgisi - FiveM'den gelecek
        const currentOfficer = ref({
            name: 'Memur K. Wilson',
            badge: 'LSPD-4521',
            callSign: 'Unit-12',
            department: 'LSPD'
        });

        // ActiveCalls component referansı
        const activeCallsRef = ref(null);

        const openCallDetail = (call) => {
            selectedCall.value = call;
            showCallModal.value = true;
        };

        const closeCallModal = () => {
            showCallModal.value = false;
            selectedCall.value = null;
        };

        // Çağrı üstlenildiğinde
        const onCallClaimed = (claimData) => {
            console.log('Dashboard: Çağrı üstlenildi', claimData);
            
            if (activeCallsRef.value) {
                const updateData = {
                    status: 'ASSIGNED',
                    assignedOfficer: claimData.officer.name,
                    assignedBadgeNumber: claimData.officer.badge,
                    assignedAt: claimData.timestamp
                };
                
                activeCallsRef.value.updateCallStatus(claimData.callId, updateData);
                stats.value.pendingCalls = Math.max(0, stats.value.pendingCalls - 1);
            }
        };

        // Çağrı tamamlandığında
        const onCallCompleted = (completeData) => {
            console.log('Dashboard: Çağrı tamamlandı', completeData);
            
            if (activeCallsRef.value) {
                const updateData = {
                    status: 'COMPLETED',
                    officerNote: completeData.note,
                    completedAt: completeData.timestamp
                };
                
                activeCallsRef.value.updateCallStatus(completeData.callId, updateData);
                
                // Bugünlük rapor sayısını artır
                stats.value.reports++;
            }
        };

        // Global state sağlayıcı
        provide('currentOfficer', currentOfficer);
        provide('claimCall', onCallClaimed);

        return {
            stats,
            selectedCall,
            showCallModal,
            currentOfficer,
            activeCallsRef,
            openCallDetail,
            closeCallModal,
            onCallClaimed,
            onCallCompleted
        };
    }
};