package com.lightshowmanager.android.lightshowmanager.pages

import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import androidx.lifecycle.ViewModelProvider
import com.lightshowmanager.android.lightshowmanager.R
import com.lightshowmanager.android.lightshowmanager.databinding.FragmentDevicesBinding
import com.lightshowmanager.android.lightshowmanager.viewModels.DevicesViewModel

class DevicesFragment : Fragment() {
    private lateinit var binding: FragmentDevicesBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentDevicesBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        val listView = binding.listViewDevices

        val viewModel = ViewModelProvider(this)[DevicesViewModel::class.java]

        viewModel.devicesResult.observe(viewLifecycleOwner) { result ->
            result.onSuccess { devices ->
                val titles = devices.map { "${it.name} (${it.type})" }
                val adapter =
                    ArrayAdapter(requireContext(), android.R.layout.simple_list_item_1, titles)
                listView.adapter = adapter

                listView.setOnItemClickListener { _, _, position, _ ->
                    val song = devices[position]
                    openDeviceDetails(song.id)
                }
            }
        }

        val token = requireContext().getSharedPreferences("session", Context.MODE_PRIVATE)
            .getString("token", null)

        viewModel.fetchDevices(token!!);
    }

    private fun openDeviceDetails(songId: Int) {
        val fragment = DeviceDetailsFragment.newInstance(songId)
        parentFragmentManager.beginTransaction()
            .replace(R.id.fragment_container, fragment)
            .addToBackStack(null)
            .commit()
    }
}