// swal.js
import Swal from 'sweetalert2';

export function showSuccess(msg) {
  Swal.fire({ icon: 'success', title: 'Success!', text: msg, timer: 1800, showConfirmButton: false });
}
export function showError(msg) {
  Swal.fire({ icon: 'error', title: 'Error', text: msg, timer: 1800, showConfirmButton: false });
}
