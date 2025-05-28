package com.lightshowmanager.android.lightshowmanager.pages

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import com.lightshowmanager.android.lightshowmanager.databinding.FragmentRegisterBinding
import com.lightshowmanager.android.lightshowmanager.viewModels.RegisterViewModel

class RegisterFragment : Fragment() {
    private lateinit var binding: FragmentRegisterBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val viewModel = ViewModelProvider(this)[RegisterViewModel::class.java]
        viewModel.registerResult.observe(viewLifecycleOwner) { result ->
            result.onSuccess { token ->
                (activity as? AuthActivity)?.startSession(token)
            }.onFailure {
                Toast.makeText(requireContext(), "Login failed", Toast.LENGTH_SHORT).show()
            }
        }

        binding = FragmentRegisterBinding.inflate(inflater, container, false)

        binding.registerButton.setOnClickListener {
            val username = binding.registerUsername.text.toString()
            val email = binding.registerEmail.text.toString()
            val password = binding.registerPassword.text.toString()
            val passwordRepeat = binding.registerRepeatPassword.text.toString()

            viewModel.register(username, email, password, passwordRepeat)
        }

        binding.goToLogin.setOnClickListener {
            (activity as? AuthActivity)?.navigateToLogin()
        }

        return binding.root
    }
}