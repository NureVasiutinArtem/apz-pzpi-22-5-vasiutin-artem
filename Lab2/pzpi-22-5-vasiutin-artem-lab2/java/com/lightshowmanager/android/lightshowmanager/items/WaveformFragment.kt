package com.lightshowmanager.android.lightshowmanager.items

import android.media.MediaPlayer
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.lifecycle.lifecycleScope
import com.lightshowmanager.android.lightshowmanager.R
import com.masoudss.lib.SeekBarOnProgressChanged
import com.masoudss.lib.WaveformSeekBar
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class WaveformFragment : Fragment() {

    private lateinit var waveformSeekBar: WaveformSeekBar
    private lateinit var btnPlayPause: Button
    private var mediaPlayer: MediaPlayer? = null
    private var isPlaying = false

    private val audioUrl: String by lazy {
        arguments?.getString("audioUrl") ?: ""
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?,
    ): View {
        val view = inflater.inflate(R.layout.fragment_waveform, container, false)
        waveformSeekBar = view.findViewById(R.id.waveformSeekBar)
        btnPlayPause = view.findViewById(R.id.btnPlayPause)

        initializePlayer()

        btnPlayPause.setOnClickListener {
            togglePlayPause()
        }

        return view
    }

    private fun initializePlayer() {
        mediaPlayer = MediaPlayer().apply {
            setDataSource(audioUrl)
            setOnPreparedListener {
                // This runs when the media is prepared
                lifecycleScope.launch(Dispatchers.IO) {
                    try {
                        // Run this in background thread
                        waveformSeekBar.setSampleFrom(audioUrl)

                        waveformSeekBar.onProgressChanged = object : SeekBarOnProgressChanged {
                            override fun onProgressChanged(
                                waveformSeekBar: WaveformSeekBar,
                                progress: Float,
                                fromUser: Boolean
                            ) {
                                if (fromUser){
                                    mediaPlayer?.seekTo((progress / 100 * mediaPlayer!!.duration).toInt())
                                }
                            }
                        }

                        // Once done, update UI (seekbar progress) on main thread
                        withContext(Dispatchers.Main) {
                            startUpdatingSeekBar()
                        }
                    } catch (e: Exception) {
                        e.printStackTrace()
                    }
                }
            }
            setOnCompletionListener {
                btnPlayPause.text = "Play"
            }
            prepareAsync()
        }
    }

    private fun togglePlayPause() {
        mediaPlayer?.let {
            if (it.isPlaying) {
                it.pause()
                isPlaying = false
                btnPlayPause.text = "Play"
            } else {
                it.start()
                isPlaying = true
                btnPlayPause.text = "Pause"
                startUpdatingSeekBar()
            }
        }
    }

    private fun startUpdatingSeekBar() {
        view?.postDelayed(object : Runnable {
            override fun run() {
                if (mediaPlayer != null && isPlaying) {
                    waveformSeekBar.progress = mediaPlayer!!.currentPosition.toFloat() / mediaPlayer!!.duration * 100
                    view?.postDelayed(this, 100)
                }
            }
        }, 100)
    }

    override fun onDestroyView() {
        mediaPlayer?.release()
        super.onDestroyView()
    }

    companion object {
        fun newInstance(audioUrl: String) = WaveformFragment().apply {
            arguments = Bundle().apply {
                putString("audioUrl", audioUrl)
            }
        }
    }
}