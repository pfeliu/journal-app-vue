<template>
  <span class="login100-form-title p-b-41">
					Sign in
				</span>
				<form @submit.prevent="onSubmit" class="login100-form validate-form p-b-33 p-t-5">

					<div class="wrap-input100 validate-input" data-validate = "Enter username">
						<input v-model="userForm.email" class="input100" type="email" placeholder="Email" required>
						<span class="focus-input100" data-placeholder="&#xe82a;"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<input v-model="userForm.password" class="input100" type="password" placeholder="Password" required>
						<span class="focus-input100" data-placeholder="&#xe80f;"></span>
					</div>

					<div class="container-login100-form-btn m-t-32">
						<button class="login100-form-btn">
							Login
						</button>

					</div>

                    <div class="container-login100-form-btn m-t-32">
                        <router-link :to="{name: 'register'}">¿Do not have account?</router-link>
                    </div>
				</form>
</template>

<script>
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth'
import Swal from 'sweetalert2'
import { ref } from 'vue'


export default {
	setup() {
			const router = useRouter()

			const { loginUser } = useAuth()

			const userForm = ref({
				
				email: 'pedro@pedro.com',
				password: '123456'
			})

			return {
				userForm,
				onSubmit: async() => {
					// console.log(userForm.value)
					const {ok, message} = await loginUser(userForm.value)

					console.log(ok, message)
					if(!ok) Swal.fire('Error', message, 'error')
					else router.push({name: 'no-entry'})
				}
			}
		}
}
</script>

<style>

</style>