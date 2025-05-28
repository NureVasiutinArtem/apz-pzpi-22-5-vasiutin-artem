package com.lightshowmanager.android.lightshowmanager.viewModels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.lightshowmanager.android.lightshowmanager.models.DeviceListModel
import com.lightshowmanager.android.lightshowmanager.serverApi.ApiResponse
import com.lightshowmanager.android.lightshowmanager.serverApi.RetrofitClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class DevicesViewModel : ViewModel() {
    private val _devicesResult = MutableLiveData<Result<List<DeviceListModel>>>()
    val devicesResult: LiveData<Result<List<DeviceListModel>>> get() = _devicesResult

    fun fetchDevices(token: String) {
        val call = RetrofitClient.deviceApi.getDevices(token)

        call.enqueue(object : Callback<ApiResponse<List<DeviceListModel>>> {
            override fun onResponse(call: Call<ApiResponse<List<DeviceListModel>>>,
                                    response: Response<ApiResponse<List<DeviceListModel>>>
            ) {
                if (response.isSuccessful && response.body() != null) {
                    _devicesResult.postValue(Result.success(response.body()!!.data!!))
                } else {
                    val error = response.errorBody()?.string() ?: "Failed to logout"
                    _devicesResult.postValue(Result.failure(Exception(error)))
                }
            }

            override fun onFailure(call: Call<ApiResponse<List<DeviceListModel>>>, t: Throwable) {
                _devicesResult.postValue(Result.failure(t))
            }
        })
    }
}