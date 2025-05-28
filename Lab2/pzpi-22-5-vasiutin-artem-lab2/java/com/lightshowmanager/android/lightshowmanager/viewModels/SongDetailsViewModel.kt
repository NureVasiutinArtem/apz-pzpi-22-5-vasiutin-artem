package com.lightshowmanager.android.lightshowmanager.viewModels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.lightshowmanager.android.lightshowmanager.models.SongModel
import com.lightshowmanager.android.lightshowmanager.models.TemplateListModel
import com.lightshowmanager.android.lightshowmanager.serverApi.ApiResponse
import com.lightshowmanager.android.lightshowmanager.serverApi.RetrofitClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SongDetailsViewModel : ViewModel() {
    private val _songResult = MutableLiveData<Result<SongModel>>()
    val songResult: LiveData<Result<SongModel>> get() = _songResult

    private val _templatesResult = MutableLiveData<Result<List<TemplateListModel>>>()
    val templatesResult: LiveData<Result<List<TemplateListModel>>> get() = _templatesResult

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