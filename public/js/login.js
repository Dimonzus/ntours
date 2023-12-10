/*eslint-disable*/

import axios from 'axios';
import { showAlert } from './alerts';

const login = async (email, password) => {
  //axios.defaults.withCredentials = true;
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      withCredetials: true,
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      //console.log(res);
      showAlert('success', 'Logged in successfully!');
      //console.log();

      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const form = document.querySelector('.form');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/users/logout'
    });
    if ((res.data.status = 'success')) {
      //location.reload(true);
      location.assign('/');
    }
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
};
