package com.lightshowmanager.android.lightshowmanager.models

data class RegisterModel(
    val username: String,
    val email: String,
    val password: String,
    val passwordRepeat: String
)
