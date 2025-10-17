import { defineStore } from "pinia";

export const useContactUsStore = defineStore("contactUsStore", {
	state: () => ({
		isOpen: false,
		showConfirmation: false,
		confirmationMessage: "",
		isConfirmationSuccess: true,
	}),
	actions: {
		toggle() {
			this.isOpen = !this.isOpen;
		},
		open() {
			this.isOpen = true;
		},
		close() {
			this.isOpen = false;
		},
		showConfirmationModal(isSuccess, message) {
			this.showConfirmation = true;
			this.isConfirmationSuccess = isSuccess;
			this.confirmationMessage = message;
			this.close();
		},
		closeConfirmationModal() {
			this.showConfirmation = false;
		},
	},
});
