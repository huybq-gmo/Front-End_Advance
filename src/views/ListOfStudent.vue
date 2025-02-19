<script setup lang="ts">
import { ref, computed } from 'vue';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const students = ref([
    { student_id: 1, student_name: "Nguyễn Văn A", student_code: "SV001", address: "Hà Nội", average_score: 8.5, date_of_birth: "2000-05-15" },
    { student_id: 2, student_name: "Trần Thị B", student_code: "SV002", address: "TP Hồ Chí Minh", average_score: 7.8, date_of_birth: "2001-08-22" },
    { student_id: 3, student_name: "Lê Văn C", student_code: "SV003", address: "Đà Nẵng", average_score: 9.1, date_of_birth: "1999-12-10" },
    { student_id: 4, student_name: "Phạm Thị D", student_code: "SV004", address: "Cần Thơ", average_score: 6.5, date_of_birth: "2002-03-18" },
    { student_id: 5, student_name: "Hoàng Văn E", student_code: "SV005", address: "Hải Phòng", average_score: 7.2, date_of_birth: "2000-11-25" },
]);

const searchQuery = ref("");

const filteredStudents = computed(() => {
    if (!searchQuery.value) return students.value;
    return students.value.filter(s =>
        s.student_code.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const showStudentCreating = ref(false);
const isUpdate = ref(false);
const form = ref({
    student_id: 0,
    name: "",
    code: "",
    address: "",
    score: "",
    dob: "",
});

const openCreateDialog = () => {
    let newId:number = 1;

    if (students.value.length > 0) {
        const lastStudent = students.value[students.value.length - 1];
        newId = lastStudent.student_id + 1;
    }

    const formattedCode = `SV${String(newId).padStart(3, "0")}`; // Định dạng SV001, SV002, ...

    form.value = {
        student_id: newId,
        name: "",
        code: formattedCode,
        address: "",
        score: "",
        dob: "",
    };

    isUpdate.value = false;
    showStudentCreating.value = true;
};


const openUpdateDialog = (data: any) => {
    isUpdate.value = true;
    form.value = {
        student_id: data.student_id,
        name: data.student_name,
        code: data.student_code,
        address: data.address,
        score: data.average_score,
        dob: data.date_of_birth 
    };
    showStudentCreating.value = true;
}

const errors = ref({
    name: "",
    code: "",
    address: "",
    score: "",
    dob: "",
});

const resetErrors = () => {
    errors.value = { name: "", code: "", address: "", score: "", dob: "" };
};

const validateForm = () => {
    errors.value = { name: "", code: "", address: "", score: "", dob: "" }; 

    if (!form.value.name) errors.value.name = "Name is required!";
    if (!form.value.code) errors.value.code = "Student Code is required!";
    if (!form.value.address) errors.value.address = "Address is required!";
    if (!form.value.score || Number(form.value.score) < 0 || Number(form.value.score) > 10)
        errors.value.score = "Score must be between 0 and 10!";
    if (!form.value.dob) errors.value.dob = "Date of Birth is required!";

    return Object.values(errors.value).every(err => err === ""); 
};

const saveStudent = () => {
    if (!validateForm()) {
        console.log("Validation failed:", errors.value);
        return;
    }

    if (isUpdate.value) {
        const index = students.value.findIndex(s => s.student_id === Number(form.value.student_id));
        if (index !== -1) {
            students.value[index] = {
                student_id: Number(form.value.student_id),
                student_name: form.value.name,
                student_code: form.value.code,
                address: form.value.address,
                average_score: Number(form.value.score),
                date_of_birth: form.value.dob,
            };
        }
    } else {
        const newStudent = {
            student_id: students.value.length > 0 ? Math.max(...students.value.map(s => s.student_id)) + 1 : 1,
            student_name: form.value.name,
            student_code: form.value.code,
            address: form.value.address,
            average_score: Number(form.value.score),
            date_of_birth: form.value.dob,
        };
        students.value.push(newStudent);
    }

    showStudentCreating.value = false;
};

const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
</script>

<template>
    <div class="container">
        <div class="p-4">
            <h2 class="text-center">Danh Sách Sinh Viên</h2>
            <div class="mb-3">
                <InputText v-model="searchQuery" placeholder="Tìm kiếm theo mã sinh viên..." class="w-full p-inputtext-sm" />
                <Button label="Create" severity="success" raised size="small" @click="openCreateDialog" />
            </div>
            <DataTable :value="filteredStudents" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]"
                class="p-datatable-sm">
                <Column field="student_id" header="ID" sortable></Column>
                <Column field="student_code" header="Mã Sinh Viên" sortable></Column>
                <Column field="student_name" header="Họ và Tên" sortable></Column>
                <Column field="address" header="Địa chỉ"></Column>
                <Column field="average_score" header="Điểm TB" sortable></Column>
                <Column field="date_of_birth" header="Ngày Sinh" sortable>
                    <template #body="{ data }">
                        {{ formatDate(data.date_of_birth) }}
                    </template>
                </Column>
                <Column header="Actions">
                    <template #body="{ data }">
                        <Button label="Update" icon="pi pi-refresh" severity="info" @click="openUpdateDialog(data)" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>

    <Dialog v-model:visible="showStudentCreating" modal :header="isUpdate ? 'Update Student' : 'Create Student'"
        @hide="resetErrors" :style="{ width: '30rem' }">
        <span class="text-muted d-block mb-3">Fill student information</span>

        <div class="mb-3">
            <label for="name" class="fw-bold">Name</label>
            <InputText id="name" v-model="form.name" class="w-100" autocomplete="off" />
            <small class="text-danger" v-if="errors.name">{{ errors.name }}</small>
        </div>

        <div class="mb-3">
            <label for="code" class="fw-bold">Student Code</label>
            <InputText id="code" :disabled="true" v-model="form.code" class="w-100" autocomplete="off" />
            <small class="text-danger" v-if="errors.code">{{ errors.code }}</small>
        </div>

        <div class="mb-3">
            <label for="address" class="fw-bold">Address</label>
            <InputText id="address" v-model="form.address" class="w-100" autocomplete="off" />
            <small class="text-danger" v-if="errors.address">{{ errors.address }}</small>
        </div>

        <div class="mb-3">
            <label for="score" class="fw-bold">Average Score</label>
            <InputText id="score" type="number" v-model="form.score" class="w-100" step="0.1" autocomplete="off" />
            <small class="text-danger" v-if="errors.score">{{ errors.score }}</small>
        </div>

        <div class="mb-4">
            <label for="dob" class="fw-bold">Date of Birth</label>
            <InputText id="dob" type="date" v-model="form.dob" class="w-100" autocomplete="off" />
            <small class="text-danger" v-if="errors.dob">{{ errors.dob }}</small>
        </div>

        <div class="d-flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary"
                @click="{ showStudentCreating = false; resetErrors() }"></Button>
            <Button type="button" label="Save" severity="primary" @click="saveStudent"></Button>
        </div>
    </Dialog>
</template>

<style scoped>
.p-datatable-sm {
    font-size: 14px;
}

:deep(.p-button) {
    margin-left: 15px;
}
:deep(.p-inputtext) {
    width: 20%;
}
</style>