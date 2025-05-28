package com.lightshowmanager.android.lightshowmanager.viewModels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.lightshowmanager.android.lightshowmanager.models.DeviceModel
import com.lightshowmanager.android.lightshowmanager.models.SongListModel
import com.lightshowmanager.android.lightshowmanager.models.SongModel
import com.lightshowmanager.android.lightshowmanager.models.TemplateListModel
import com.lightshowmanager.android.lightshowmanager.serverApi.ApiResponse
import com.lightshowmanager.android.lightshowmanager.serverApi.RetrofitClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class DeviceDetailsViewModel : ViewModel() {
    private val _deviceResult = MutableLiveData<Result<DeviceModel>>()
    val deviceResult: LiveData<Result<DeviceModel>> get() = _deviceResult

    private val _songsResult = MutableLiveData<Result<List<SongListModel>>>()
    val songsResult: LiveData<Result<List<SongListModel>>> get() = _songsResult

    private val _songResult = MutableLiveData<Result<SongModel>>()
    val songResult: LiveData<Result<SongModel>> get() = _songResult

    private val _templatesResult = MutableLiveData<Result<List<TemplateListModel>>>()
    val templatesResult: LiveData<Result<List<TemplateListModel>>> get() = _templatesResult

    private val _deviceTurnOnOffResult = MutableLiveData<Result<String>>()
    val deviceTurnOnOffResult: LiveData<Result<String>> get() = _deviceTurnOnOffResult

    var isOn = false

    fun turnOffDevice(deviceId: Int){
        val call = RetrofitClient.deviceApi.turnOffDevice(deviceId)

        call.enqueue(object : Callback<ApiResponse<String>> {
            override fun onResponse(call: Call<ApiResponse<String>>,
                                    response: Response<ApiResponse<String>>
            ) {
                if (response.isSuccessful) {
                    _deviceTurnOnOffResult.postValue(Result.success("Device turned off"))
                } else {
                    val error = response.errorBody()?.string() ?: "Failed to logout"
                    _deviceTurnOnOffResult.postValue(Result.failure(Exception(error)))
                }
            }

            override fun onFailure(call: Call<ApiResponse<String>>, t: Throwable) {
                _deviceTurnOnOffResult.postValue(Result.failure(t))
            }
        })
    }

    fun turnOnDevice(deviceId: Int){
        val call = RetrofitClient.deviceApi.turnOnDevice(deviceId)

        call.enqueue(object : Callback<ApiResponse<String>> {
            override fun onResponse(call: Call<ApiResponse<String>>,
                                    response: Response<ApiResponse<String>>
            ) {
                if (response.isSuccessful) {
                    _deviceTurnOnOffResult.postValue(Result.success("Device turned on"))
                } else {
                    val error = response.errorBody()?.string() ?: "Failed to logout"
                    _deviceTurnOnOffResult.postValue(Result.failure(Exception(error)))
                }
            }

            override fun onFailure(call: Call<ApiResponse<String>>, t: Throwable) {
                _deviceTurnOnOffResult.postValue(Result.failure(t))
            }
        })
    }

    fun fetchDevice(deviceId: Int) {
        val call = RetrofitClient.deviceApi.getDevice(deviceId)

        call.enqueue(object : Callback<ApiResponse<DeviceModel>> {
            override fun onResponse(call: Call<ApiResponse<DeviceModel>>,
                                    response: Response<ApiResponse<DeviceModel>>
            ) {
                if (response.isSuccessful && response.body() != null) {
                    _deviceResult.postValue(Result.success(response.body()!!.data!!))
                } else {
                    val error = response.errorBody()?.string() ?: "Failed to logout"
                    _deviceResult.postValue(Result.failure(Exception(error)))
                }
            }

            override fun onFailure(call: Call<ApiResponse<DeviceModel>>, t: Throwable) {
                _deviceResult.postValue(Result.failure(t))
            }
        })
    }

    fun fetchSongs(token: String) {
        val call = RetrofitClient.songApi.getSongs(token)

        call.enqueue(object : Callback<ApiResponse<List<SongListModel>>> {
            override fun onResponse(call: Call<ApiResponse<List<SongListModel>>>,
                                    response: Response<ApiResponse<List<SongListModel>>>
            ) {
                if (response.isSuccessful && response.body() != null) {
                    _songsResult.postValue(Result.success(response.body()!!.data!!))
                } else {
                    val error = response.errorBody()?.string() ?: "Failed to logout"
                    _songsResult.postValue(Result.failure(Exception(error)))
                }
            }

            override fun onFailure(call: Call<ApiResponse<List<SongListModel>>>, t: Throwable) {
                _songsResult.postValue(Result.failure(t))
            }
        })
    }

    fun fetchSong(songId: Int) {
        val call = RetrofitClient.songApi.getSong(songId)

        call.enqueue(object : Callback<ApiResponse<SongModel>> {
            override fun onResponse(call: Call<ApiResponse<SongModel>>,
                                    response: Response<ApiResponse<SongModel>>
            ) {
                if (response.isSuccessful && response.body() != null) {
                    _songResult.postValue(Result.success(response.body()!!.data!!))
                } else {
                    val error = response.errorBody()?.string() ?: "Failed to logout"
                    _songResult.postValue(Result.failure(Exception(error)))
                }
            }

            override fun onFailure(call: Call<ApiResponse<SongModel>>, t: Throwable) {
                _songResult.postValue(Result.failure(t))
            }
        })
    }

    fun fetchTemplates(songId: Int) {
        val call = RetrofitClient.templateApi.getTemplatesForSong(songId)

        call.enqueue(object : Callback<ApiResponse<List<TemplateListModel>>> {
            override fun onResponse(call: Call<ApiResponse<List<TemplateListModel>>>,
                                    response: Response<ApiResponse<List<TemplateListModel>>>
            ) {
                if (response.isSuccessful && response.body() != null) {
                    _templatesResult.postValue(Result.success(response.body()!!.data!!))
                } else {
                    val error = response.errorBody()?.string() ?: "Failed to logout"
                    _templatesResult.postValue(Result.failure(Exception(error)))
                }
            }

            override fun onFailure(call: Call<ApiResponse<List<TemplateListModel>>>, t: Throwable) {
                _templatesResult.postValue(Result.failure(t))
            }
        })
    }
}