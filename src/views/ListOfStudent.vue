<script setup lang="ts">
import { ref, computed } from 'vue';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const students = ref([
    { student_id: 1, student_name: "Nguyễn Văn A", student_code: "SV001", address: "Hà Nội", average_score: 8.5, date_of_birth: "15/05/2000" },
    { student_id: 2, student_name: "Trần Thị B", student_code: "SV002", address: "TP Hồ Chí Minh", average_score: 7.8, date_of_birth: "22/08/2001" },
    { student_id: 3, student_name: "Lê Văn C", student_code: "SV003", address: "Đà Nẵng", average_score: 9.1, date_of_birth: "10/12/1999" },
    { student_id: 4, student_name: "Phạm Thị D", student_code: "SV004", address: "Cần Thơ", average_score: 6.5, date_of_birth: "18/03/2002" },
    { student_id: 5, student_name: "Hoàng Văn E", student_code: "SV005", address: "Hải Phòng", average_score: 7.2, date_of_birth: "25/11/2000" },
]);


const searchQuery = ref("");

const filteredStudents = computed(() => {
    if (!searchQuery.value) return students.value;
    return students.value.filter(s =>
        s.student_name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});


</script>
<template>
    <div class="container">
        <div class="p-4">
            <h2 class="text-center">Danh Sách Sinh Viên</h2>
            <div class="mb-3">
                <InputText v-model="searchQuery" placeholder="Tìm kiếm theo tên..." class="w-full p-inputtext-sm" />
            </div>
            <DataTable :value="filteredStudents" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]"
                class="p-datatable-sm">
                <Column field="student_id" header="ID" sortable></Column>
                <Column field="student_name" header="Họ và Tên" sortable></Column>
                <Column field="student_code" header="Mã Sinh Viên" sortable></Column>
                <Column field="address" header="Địa chỉ"></Column>
                <Column field="average_score" header="Điểm TB" sortable></Column>
                <Column field="date_of_birth" header="Ngày Sinh" sortable>

                </Column>
            </DataTable>
        </div>
    </div>
</template>



<style scoped>
.p-datatable-sm {
    font-size: 14px;
}
</style>