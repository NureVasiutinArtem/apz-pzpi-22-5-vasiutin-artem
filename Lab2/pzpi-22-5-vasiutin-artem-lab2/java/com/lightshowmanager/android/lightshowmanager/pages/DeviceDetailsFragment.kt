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
import com.lightshowmanager.android.lightshowmanager.databinding.FragmentDeviceDetailsBinding
import com.lightshowmanager.android.lightshowmanager.items.WaveformFragment
import com.lightshowmanager.android.lightshowmanager.viewModels.DeviceDetailsViewModel
import androidx.core.view.isGone

class DeviceDetailsFragment : Fragment() {
    private lateinit var binding: FragmentDeviceDetailsBinding
    private lateinit var viewModel: DeviceDetailsViewModel

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentDeviceDetailsBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        val deviceId = arguments?.getInt("deviceId") ?: return

        viewModel = ViewModelProvider(this)[DeviceDetailsViewModel::class.java]

        viewModel.deviceResult.observe(viewLifecycleOwner) { result ->
            result.onSuccess { device ->
                binding.textName.text = device.name
                binding.textType.text = device.type
                binding.textLastOnline.text = device.lastOnline
                viewModel.isOn = device.isOn

                toggleIsOnOff()
            }
        }

        viewModel.songsResult.observe(viewLifecycleOwner) { result ->
            result.onSuccess { songs ->
                val titles = songs.map { "${it.name} by ${it.artist}" }
                val adapter =
                    ArrayAdapter(requireContext(), android.R.layout.simple_list_item_1, titles)
                binding.listSongs.adapter = adapter

                binding.listSongs.setOnItemClickListener { _, _, position, _ ->
                    val song = songs[position]
                    viewModel.fetchSong(song.id)
                    viewModel.fetchTemplates(song.id)
                }
            }
        }

        viewModel.songResult.observe(viewLifecycleOwner) { result ->
            result.onSuccess { song ->
                binding.songInfoContainer.visibility = View.VISIBLE
                binding.textSongTitle.text = song.name
                binding.textSongArtist.text = "Artist: ${song.artist}"
                val cleanPath = song.path?.replace(Regex("^/+"), "")
                val audioUrl = "https://18f49xqj-7015.uks1.devtunnels.ms/$cleanPath"

                val waveformFragment = WaveformFragment.newInstance(audioUrl)

                childFragmentManager.beginTransaction()
                    .replace(R.id.waveformContainer, waveformFragment)
                    .commit()
            }
        }

        viewModel.templatesResult.observe(viewLifecycleOwner) { result ->
            result.onSuccess { templates ->
                val names = templates.map { it.name }
                val adapter = ArrayAdapter(requireContext(), android.R.layout.simple_list_item_1, names)
                binding.listTemplates.adapter = adapter

                binding.listTemplates.setOnItemClickListener { _, _, position, _ ->
                    val template = templates[position]
                    binding.textChosenTemplate.text = template.name
                }
            }
        }

        viewModel.deviceTurnOnOffResult.observe(viewLifecycleOwner) { result ->
            result.onSuccess { message ->
                viewModel.isOn = !viewModel.isOn
                toggleIsOnOff()
            }
        }

        binding.buttonTemplates.setOnClickListener {
            val open = binding.listTemplates.isGone

            if (open) {
                binding.listTemplates.visibility = View.VISIBLE
                binding.buttonTemplates.text = "Hide Templates"
            } else {
                binding.listTemplates.visibility = View.GONE
                binding.buttonTemplates.text = "Templates"
            }
        }

        binding.buttonTurnOnOff.setOnClickListener {
            if (viewModel.isOn) {
                viewModel.turnOffDevice(deviceId)
            } else {
                viewModel.turnOnDevice(deviceId)
            }
        }

        viewModel.fetchDevice(deviceId)

        val token = requireContext().getSharedPreferences("session", Context.MODE_PRIVATE)
            .getString("token", null)
        viewModel.fetchSongs(token!!)
    }

    private fun toggleIsOnOff(){
        binding.textIsOn.text = if (viewModel.isOn) "Device is ON" else "Device is OFF"
        binding.buttonTurnOnOff.text = if (viewModel.isOn) "Turn OFF" else "Turn ON"
    }

    companion object {
        fun newInstance(deviceId: Int): DeviceDetailsFragment {
            val fragment = DeviceDetailsFragment()
            val args = Bundle()
            args.putInt("deviceId", deviceId)
            fragment.arguments = args
            return fragment
        }
    }
}