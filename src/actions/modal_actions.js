export const SHOWMODAL = "SHOWMODAL";
export const HIDEMODAL = "HIDEMODAL";

export const showModal = modalType => ({
  type: SHOWMODAL,
  modalType: modalType
})

export const hideModal = () => ({
  type: HIDEMODAL
})
