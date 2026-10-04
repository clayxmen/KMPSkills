package com.variostudio.kmpskills

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform