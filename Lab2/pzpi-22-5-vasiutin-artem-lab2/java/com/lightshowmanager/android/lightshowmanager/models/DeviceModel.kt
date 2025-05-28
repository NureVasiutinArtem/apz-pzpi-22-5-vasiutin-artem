package com.lightshowmanager.android.lightshowmanager.models

data class DeviceModel(
    val name: String,
    val type: String?,
    val lastOnline: String?,
    val isOn: Boolean,
)
