import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import getlightconeInfo_core from '../core/getlightconeInfo_core';

export const data = new SlashCommandBuilder()
    .setName('getlightconeimage')
    .setDescription('광추 이름으로 광추 이미지 검색')

    .addStringOption((Option) => Option.setName("lightconename")
        .setDescription("광추 이름을 적어주세요: ")
        .setRequired(true))


export async function execute(interaction: ChatInputCommandInteraction) {
    getlightconeInfo_core(interaction);
}