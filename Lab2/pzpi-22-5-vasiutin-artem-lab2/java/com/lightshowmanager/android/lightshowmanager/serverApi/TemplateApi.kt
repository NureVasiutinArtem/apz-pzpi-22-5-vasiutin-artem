package com.lightshowmanager.android.lightshowmanager.serverApi

import com.lightshowmanager.android.lightshowmanager.models.TemplateListModel
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Query

interface TemplateApi {
    @GET("for-song")
    fun getTemplatesForSong(@Query("id") songId: Int):
            Call<ApiResponse<List<TemplateListModel>>>
}