package com.lightshowmanager.android.lightshowmanager.viewModels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.lightshowmanager.android.lightshowmanager.models.RegisterModel
import com.lightshowmanager.android.lightshowmanager.serverApi.ApiResponse
import com.lightshowmanager.android.lightshowmanager.serverApi.RetrofitClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterViewModel : ViewModel() {
    private val _registerResult = MutableLiveData<Result<String>>() // token string
    val registerResult: LiveData<Result<String>> get() = _registerResult

    fun register(username: String, email: String, password: String, passwordRepeat: String) {
        val call = RetrofitClient.userApi.register(
            RegisterModel(username, email, password, passwordRepeat))

        call.enqueue(object : Callback<ApiResponse<String>> {
            override fun onResponse(call: Call<ApiResponse<String>>, response: Response<ApiResponse<String>>) {
                if (response.isSuccessful && response.body() != null) {
                    _registerResult.postValue(Result.success(response.body()!!.data!!))
                } else {
                    val error = response.errorBody()?.string() ?: "Login failed"
                    _registerResult.postValue(Result.failure(Exception(error)))
                }
            }

            override fun onFailure(call: Call<ApiResponse<String>>, t: Throwable) {
                _registerResult.postValue(Result.failure(t))
            }
        })
    }
}