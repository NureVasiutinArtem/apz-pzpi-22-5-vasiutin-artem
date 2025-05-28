package com.lightshowmanager.android.lightshowmanager.pages

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import com.lightshowmanager.android.lightshowmanager.viewModels.LoginViewModel
import com.lightshowmanager.android.lightshowmanager.databinding.FragmentLoginBinding

class LoginFragment : Fragment() {
    private lateinit var binding: FragmentLoginBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val viewModel = ViewModelProvider(this)[LoginViewModel::class.java]
        viewModel.loginResult.observe(viewLifecycleOwner) { result ->
            result.onSuccess { token ->
                (activity as? AuthActivity)?.startSession(token)
            }.onFailure {
                Toast.makeText(requireContext(), "Login failed", Toast.LENGTH_SHORT).show()
            }
        }

        binding = FragmentLoginBinding.inflate(inflater, container, false)

        binding.loginButton.setOnClickListener {
            val email = binding.loginEmail.text.toString()
            val password = binding.loginPassword.text.toString()

            viewModel.login(email, password)
        }

        binding.goToRegister.setOnClickListener {
            (activity as? AuthActivity)?.navigateToRegister()
        }

        return binding.root
    }
}