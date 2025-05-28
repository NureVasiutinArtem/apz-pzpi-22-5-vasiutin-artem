package com.lightshowmanager.android.lightshowmanager.serverApi

import com.lightshowmanager.android.lightshowmanager.models.LoginModel
import com.lightshowmanager.android.lightshowmanager.models.RegisterModel
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.PUT

interface UserApi {
    @POST("login")
    fun login(@Body model: LoginModel): Call<ApiResponse<String>>

    @POST("register")
    fun register(@Body model: RegisterModel): Call<ApiResponse<String>>

    @PUT("logout")
    fun logout(@Header("Token") token: String):
            Call<ApiResponse<String>>
}