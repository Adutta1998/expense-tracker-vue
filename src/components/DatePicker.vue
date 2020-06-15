<template>
    <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="picker"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
            v-model="picker"
            label="Select Date"
            prepend-inner-icon="mdi-calendar"
            readonly
            outlined
            hide-details="auto"
            class="mb-2"
            v-bind="attrs"
            v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker v-model="picker" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" outlined @click="modal = false">Cancel</v-btn>
            <v-btn text color="primary" outlined @click="$refs.dialog.save(picker)">OK</v-btn>
        </v-date-picker>
    </v-dialog>
</template>
<script>
export default {
    data(){
        return{
            modal:false,
            picker: "",
        }
    },
    watch:{
        picker(newv){
            this.$emit("dateChanged",newv)
        }
    }
}
</script>