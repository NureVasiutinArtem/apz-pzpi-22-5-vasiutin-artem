package com.lightshowmanager.android.lightshowmanager.pages

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.addCallback
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GravityCompat
import androidx.lifecycle.ViewModelProvider
import com.lightshowmanager.android.lightshowmanager.R
import com.lightshowmanager.android.lightshowmanager.databinding.ActivityMainBinding
import com.lightshowmanager.android.lightshowmanager.viewModels.MainViewModel
import androidx.core.content.edit

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var drawerToggle: ActionBarDrawerToggle

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val token = getSharedPreferences("session", Context.MODE_PRIVATE)
            .getString("token", null)

        if (token == null) {
            startActivity(Intent(this, AuthActivity::class.java))
            finish()
            return
        }

        val viewModel = ViewModelProvider(this)[MainViewModel::class.java]

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(false)

        drawerToggle = ActionBarDrawerToggle(
            this,
            binding.drawerLayout,
            binding.toolbar,
            R.string.navigation_drawer_open,
            R.string.navigation_drawer_close
        )

        binding.drawerLayout.addDrawerListener(drawerToggle)
        drawerToggle.syncState()

        // Set default fragment
        if (savedInstanceState == null) {
            replaceFragment(SongsFragment(), "Songs")
        }

        // Navigation button actions
        binding.btnSongs.setOnClickListener {
            replaceFragment(SongsFragment(), "Songs")
        }

        binding.btnDevices.setOnClickListener {
            replaceFragment(DevicesFragment(), "Devices")
        }

        binding.btnLogout.setOnClickListener {
            Toast.makeText(this, "Logging out...", Toast.LENGTH_SHORT).show()

            viewModel.logout(token)
        }

        onBackPressedDispatcher.addCallback(this) {
            if (binding.drawerLayout.isDrawerOpen(GravityCompat.START)) {
                binding.drawerLayout.closeDrawer(GravityCompat.START)
            } else if (supportFragmentManager.backStackEntryCount > 0) {
                supportFragmentManager.popBackStack()
            } else {
                finish()
            }
        }

        viewModel.logoutResult.observe(this) { result ->
            result.onSuccess { message ->
                getSharedPreferences("session", Context.MODE_PRIVATE)
                    .edit() {
                        clear()
                    }
                startActivity(Intent(this, AuthActivity::class.java))
                finish()
            }
        }
    }

    private fun replaceFragment(fragment: androidx.fragment.app.Fragment, title: String) {
        supportFragmentManager.beginTransaction()
            .replace(binding.fragmentContainer.id, fragment)
            .commit()
        supportActionBar?.title = title
        binding.drawerLayout.closeDrawers()
    }
}