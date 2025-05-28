package com.lightshowmanager.android.lightshowmanager.pages

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import androidx.lifecycle.ViewModelProvider
import com.lightshowmanager.android.lightshowmanager.R
import com.lightshowmanager.android.lightshowmanager.databinding.FragmentSongDetailsBinding
import com.lightshowmanager.android.lightshowmanager.viewModels.SongDetailsViewModel
import com.lightshowmanager.android.lightshowmanager.items.WaveformFragment

class SongDetailsFragment : Fragment() {
    private lateinit var binding: FragmentSongDetailsBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentSongDetailsBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        val songId = arguments?.getInt("songId") ?: return

        val viewModel = ViewModelProvider(this)[SongDetailsViewModel::class.java]

        viewModel.songResult.observe(viewLifecycleOwner) { result ->
            result.onSuccess { song ->
                binding.textTitle.text = song.name
                binding.textArtist.text = "Artist: ${song.artist}"
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
            }
        }

        viewModel.fetchSong(songId)
        viewModel.fetchTemplates(songId)
    }

    companion object {
        fun newInstance(songId: Int): SongDetailsFragment {
            val fragment = SongDetailsFragment()
            val args = Bundle()
            args.putInt("songId", songId)
            fragment.arguments = args
            return fragment
        }
    }
}