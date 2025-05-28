package com.lightshowmanager.android.lightshowmanager.serverApi

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitClient {
    private const val BASE_URL = "https://18f49xqj-7015.uks1.devtunnels.ms/api/"

    private val logging = HttpLoggingInterceptor().apply {
        setLevel(HttpLoggingInterceptor.Level.BODY)
    }

    private val client = OkHttpClient.Builder()
        .addInterceptor(logging)
        .build()

    val userApi: UserApi by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL+"users/")
            .addConverterFactory(GsonConverterFactory.create())
            .client(client)
            .build()
            .create(UserApi::class.java)
    }

    val songApi: SongApi by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL+"songs/")
            .addConverterFactory(GsonConverterFactory.create())
            .client(client)
            .build()
            .create(SongApi::class.java)
    }

    val templateApi: TemplateApi by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL+"templates/")
            .addConverterFactory(GsonConverterFactory.create())
            .client(client)
            .build()
            .create(TemplateApi::class.java)
    }

    val deviceApi: DeviceApi by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL+"devices/")
            .addConverterFactory(GsonConverterFactory.create())
            .client(client)
            .build()
            .create(DeviceApi::class.java)
    }
}