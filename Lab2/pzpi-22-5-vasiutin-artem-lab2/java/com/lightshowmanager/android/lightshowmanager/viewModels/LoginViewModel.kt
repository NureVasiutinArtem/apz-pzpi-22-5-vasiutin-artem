package com.lightshowmanager.android.lightshowmanager.viewModels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

import com.lightshowmanager.android.lightshowmanager.models.LoginModel
import com.lightshowmanager.android.lightshowmanager.serverApi.ApiResponse
import com.lightshowmanager.android.lightshowmanager.serverApi.RetrofitClient

class LoginViewModel : ViewModel() {
    private val _loginResult = MutableLiveData<Result<String>>() // token string
    val loginResult: LiveData<Result<String>> get() = _loginResult

    fun login(email: String, password: String) {
        val call = RetrofitClient.userApi.login(LoginModel(email, password))

        call.enqueue(object : Callback<ApiResponse<String>> {
            override fun onResponse(call: Call<ApiResponse<String>>, response: Response<ApiResponse<String>>) {
                if (response.isSuccessful && response.body() != null) {
                    _loginResult.postValue(Result.success(response.body()!!.data!!))
                } else {
                    val error = response.errorBody()?.string() ?: "Login failed"
                    _loginResult.postValue(Result.failure(Exception(error)))
                }
            }

            override fun onFailure(call: Call<ApiResponse<String>>, t: Throwable) {
                _loginResult.postValue(Result.failure(t))
            }
        })
    }
}