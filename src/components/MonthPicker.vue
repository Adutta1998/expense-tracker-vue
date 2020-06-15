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
            label="Select Month"
            prepend-inner-icon="mdi-calendar"
            readonly
            outlined
            class="mt-2"
            v-bind="attrs"
            v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker v-model="picker" scrollable type="month">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(picker)">OK</v-btn>
        </v-date-picker>
    </v-dialog>
</template>
<script>
export default {
    data(){
        return{
            modal:false,
            picker: new Date().toISOString().substr(0, 7),
            months:["January","February","March","April","May","June","July","September","October","November","December"]
        }
    },
    watch:{
        picker(newv){
            this.$emit("monthChanged",newv)
        }
    }
}
</script>