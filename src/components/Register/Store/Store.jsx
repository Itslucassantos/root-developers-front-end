import { create } from 'zustand';

const useStore = create((set) => ({
  physicalPersonData: {
    firstName: '',
    surname: '',
    email: '',
    confirmEmail: '',
    cpf: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  },
  legalPersonData: {
    socialReason: '',
    cnpj: '',
    firstName: '',
    surname: '',
    email: '',
    confirmEmail: '',
    cpf: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  },
  addressData: {
    state: '',
    city: '',
    publicPlace: '',
    neighborhood: '',
    number: '',
    zipCode: '',
    complement: '',
  },
  incomeTaxEmail: {
    email: '',
  },
  deleteStatus: {
    status: '',
  },
  setPhysicalPersonData: (data) =>
    set((state) => ({
      physicalPersonData: { ...state.physicalPersonData, ...data },
    })),
  setLegalPersonData: (data) =>
    set((state) => ({
      legalPersonData: { ...state.legalPersonData, ...data },
    })),
  setAddressData: (data) =>
    set((state) => ({
      addressData: { ...state.addressData, ...data },
    })),
  setIncomeTaxEmail: (email) =>
    set((state) => ({
      incomeTaxEmail: { ...state.incomeTaxEmail, email },
    })),
  setDeleteStatus: (status) =>
    set((state) => ({
      deleteStatus: { ...state.deleteStatus, status },
    })),
  resetPhysicalPersonData: () =>
    set({
      physicalPersonData: {
        firstName: '',
        surname: '',
        email: '',
        confirmEmail: '',
        cpf: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
      },
    }),
  resetLegalPersonData: () =>
    set({
      legalPersonData: {
        socialReason: '',
        cnpj: '',
        firstName: '',
        surname: '',
        email: '',
        confirmEmail: '',
        cpf: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
      },
    }),
  resetAddressData: () =>
    set({
      addressData: {
        state: '',
        city: '',
        publicPlace: '',
        neighborhood: '',
        number: '',
        zipCode: '',
        complement: '',
      },
    }),
  resetIncomeTaxEmail: () =>
    set({
      incomeTaxEmail: {
        email: '',
      },
    }),
  resetDeleteStatus: () =>
    set({
      deleteStatus: {
        status: '',
      },
    }),
}));

export default useStore;
