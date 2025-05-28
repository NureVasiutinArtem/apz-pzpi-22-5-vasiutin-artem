package com.lightshowmanager.android.lightshowmanager.viewModels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

import com.lightshowmanager.android.lightshowmanager.serverApi.RetrofitClient
import com.lightshowmanager.android.lightshowmanager.serverApi.ApiResponse

class MainViewModel : ViewModel() {
    private val _logoutResult = MutableLiveData<Result<String>>()
    val logoutResult: LiveData<Result<String>> get() = _logoutResult

    fun logout(token: String) {
        val call = RetrofitClient.userApi.logout(token)

        call.enqueue(object : Callback<ApiResponse<String>> {
            override fun onResponse(call: Call<ApiResponse<String>>,
                                    response: Response<ApiResponse<String>>
            ) {
                if (response.isSuccessful) {
                    _logoutResult.postValue(Result.success("Logged out successfully"))
                } else {
                    val error = response.errorBody()?.string() ?: "Failed to logout"
                    _logoutResult.postValue(Result.failure(Exception(error)))
                }
            }

            override fun onFailure(call: Call<ApiResponse<String>>, t: Throwable) {
                _logoutResult.postValue(Result.failure(t))
            }
        })
    }
}