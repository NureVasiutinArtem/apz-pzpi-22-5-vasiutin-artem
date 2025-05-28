package com.lightshowmanager.android.lightshowmanager.pages

import android.content.Context
import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import androidx.lifecycle.ViewModelProvider
import com.lightshowmanager.android.lightshowmanager.R
import com.lightshowmanager.android.lightshowmanager.databinding.FragmentSongsBinding
import com.lightshowmanager.android.lightshowmanager.viewModels.SongsViewModel

class SongsFragment : Fragment() {

    private lateinit var binding: FragmentSongsBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentSongsBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        val listView = binding.listViewSongs

        val viewModel = ViewModelProvider(this)[SongsViewModel::class.java]

        viewModel.songsResult.observe(viewLifecycleOwner) { result ->
            result.onSuccess { songs ->
                val titles = songs.map { "${it.name} by ${it.artist}" }
                val adapter =
                    ArrayAdapter(requireContext(), android.R.layout.simple_list_item_1, titles)
                listView.adapter = adapter

                listView.setOnItemClickListener { _, _, position, _ ->
                    val song = songs[position]
                    openSongDetails(song.id)
                }
            }
        }

        val token = requireContext().getSharedPreferences("session", Context.MODE_PRIVATE)
            .getString("token", null)

        viewModel.fetchSongs(token!!);
    }

    private fun openSongDetails(songId: Int) {
        val fragment = SongDetailsFragment.newInstance(songId)
        parentFragmentManager.beginTransaction()
            .replace(R.id.fragment_container, fragment)
            .addToBackStack(null)
            .commit()
    }
}