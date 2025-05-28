package com.lightshowmanager.android.lightshowmanager.viewModels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.lightshowmanager.android.lightshowmanager.models.SongListModel
import com.lightshowmanager.android.lightshowmanager.serverApi.ApiResponse
import com.lightshowmanager.android.lightshowmanager.serverApi.RetrofitClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SongsViewModel : ViewModel() {
    private val _songsResult = MutableLiveData<Result<List<SongListModel>>>()
    val songsResult: LiveData<Result<List<SongListModel>>> get() = _songsResult

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
}