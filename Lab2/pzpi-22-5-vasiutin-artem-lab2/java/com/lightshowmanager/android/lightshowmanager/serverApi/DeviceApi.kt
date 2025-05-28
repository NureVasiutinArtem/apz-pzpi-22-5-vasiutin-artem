package com.lightshowmanager.android.lightshowmanager.serverApi

import com.lightshowmanager.android.lightshowmanager.models.DeviceListModel
import com.lightshowmanager.android.lightshowmanager.models.DeviceModel
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.PUT
import retrofit2.http.Path

interface DeviceApi {
    @GET("all")
    fun getDevices(@Header("Token") token: String):
            Call<ApiResponse<List<DeviceListModel>>>

    @GET("{id}")
    fun getDevice(
        @Path("id") id: Int
    ): Call<ApiResponse<DeviceModel>>

    @PUT("turn-on/{id}")
    fun turnOnDevice(
        @Path("id") id: Int
    ): Call<ApiResponse<String>>

    @PUT("turn-off/{id}")
    fun turnOffDevice(
        @Path("id") id: Int
    ): Call<ApiResponse<String>>

}