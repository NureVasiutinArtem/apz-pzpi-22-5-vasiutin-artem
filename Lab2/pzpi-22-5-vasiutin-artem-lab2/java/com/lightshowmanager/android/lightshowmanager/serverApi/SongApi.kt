package com.lightshowmanager.android.lightshowmanager.serverApi

import com.lightshowmanager.android.lightshowmanager.models.SongListModel
import com.lightshowmanager.android.lightshowmanager.models.SongModel
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Path

interface SongApi {
    @GET("all")
    fun getSongs(@Header("Token") token: String):
            Call<ApiResponse<List<SongListModel>>>

    @GET("{id}")
    fun getSong(
        @Path("id") id: Int
    ): Call<ApiResponse<SongModel>>
}