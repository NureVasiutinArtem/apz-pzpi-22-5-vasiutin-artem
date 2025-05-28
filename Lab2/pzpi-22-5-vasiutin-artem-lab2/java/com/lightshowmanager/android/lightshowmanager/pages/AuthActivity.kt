package com.lightshowmanager.android.lightshowmanager.pages

import android.content.Context
import android.os.Bundle
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.edit
import com.lightshowmanager.android.lightshowmanager.R

class AuthActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_auth)

        if (savedInstanceState == null) {
            supportFragmentManager.beginTransaction()
                .replace(R.id.auth_fragment_container, LoginFragment())
                .commit()
        }
    }

    fun navigateToRegister() {
        supportFragmentManager.beginTransaction()
            .replace(R.id.auth_fragment_container, RegisterFragment())
            .addToBackStack(null)
            .commit()
    }

    fun navigateToLogin() {
        supportFragmentManager.beginTransaction()
            .replace(R.id.auth_fragment_container, LoginFragment())
            .addToBackStack(null)
            .commit()
    }

    fun startSession(token: String) {
        getSharedPreferences("session",
            Context.MODE_PRIVATE).edit() {
            putString(
                "token",
                token
            )
        }

        val intent = Intent(this, MainActivity::class.java)
        startActivity(intent)
        finish()
    }
}